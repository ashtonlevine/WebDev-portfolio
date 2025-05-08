const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cookies = require("cookie-parser")//this is a middleware that parses cookies attached to the client request object and makes them available as req.cookies
app.use(cookies()); //this is how you use the cookie-parser middleware

//now to format the date

function formatDate(date){
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayName = days[date.getDay()]; //getDay() returns the day from 0 to 6
    const monthName = months[date.getMonth()]; //getMonth() returns the month from 0 to 11
    const day = date.getDate(); //getDate() returns the day of the month from 1 to 31
    const year = date.getFullYear(); //getFullYear() returns the year

    const time = date.toTimeString().split(" ")[0]; //ToTimeString() returns only the time in the format HH:MM:SS 
    const timeZoneName = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(date).find(part => part.type === 'timeZoneName').value;
    //QUICK EXPLANATION OF OF TIMEZONE EXTRACTION:
    //Intl.DateTimeFormat() is a constructor that creates a new DateTimeFormat object.
    //The constructor takes two arguments: a locale and an options object.
    //The formatToParts() method formats the date and returns an array of objects that represent the parts of the formatted date. 
    //The find() method is used to find the first element in the array that satisfies the condition specified in the callback function.
    //The timeZoneName option specifies that the time zone name should be included in the formatted date.
    //The value property of the object that has the type property equal to 'timeZoneName' contains the time zone name.
    return `${dayName} ${monthName} ${day} ${time} ${timeZoneName} ${year}`;
}

app.get("/", (req,res) => {
    let visits = req.cookies.visits; //this will get the value of the visits cookie
    let lastVisit = req.cookies.lastVisit; //this will get the value of the lastVisit cookie
    let date = new Date(); //this will get the current date and time
    let message = ""; //initialize the message variable

    if (!visits){ //since visits = 0 it will evaluate to false so inverting it will make it true which allows the if statement to run
        visits = 1;
        message = "Welcome to my webpage! It is your first time that you are here.";
    }
    else {
        visits = parseInt(visits) + 1; //increment the number of visits by 1 and make sure its in base 10
        message = `Hello, this is the ${visits} time that you are visiting my webpage.` 
        if (lastVisit) {
        message += ` Your last visit was on ${lastVisit}`;
    }
}
//now to set the cookies
res.cookie("visits", visits, {maxAge: 1000*60*60*24*365}); //this will set the visits cookie with the value of the visits variable and an expiration date of 1 year
res.cookie("lastVisit", formatDate(date), {maxAge: 1000*60*60*24*365}); //this will set the lastVisit cookie with the value of the formatted date and an expiration date of 1 year
res.send(message); //this will send the message to the client
});

//(not in the assignment instructions but i added this) if you want to reset the cookies you can use the following route:
app.get("/reset-cookies", (req, res) => {
    res.clearCookie("visits");
    res.clearCookie("lastVisit");
    res.send("Cookies have been reset. delete the reset-cookies from the URL to go back to the main page.");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



