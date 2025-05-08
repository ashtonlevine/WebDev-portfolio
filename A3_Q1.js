const express = require("express");
const app = express(); // this is the express function that is imported from the express module
const port = 3000; // this is the port number that the server will run on client side

app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // For parsing JSON data

function findSummation (n = 1){ //setting default value of n to 1 
    if (n <= 0 || typeof n !== 'number' || !Number.isInteger(n)){
        return false;
    }
    else {
        let sum = 0;
        for (let i = 1; i<=n; i++){
            sum += i;
        }
        return sum;
    }
}

function uppercaseFirstandLast(str){
    if (typeof str !== 'string'){
        return false;
    }
    else {
        return str.charAt(0).toUpperCase() + str.slice(1, -1) + str.charAt(str.length-1).toUpperCase(); //slice(1, -1) returns the string from the second character to the second last character
    }
}

function findAverageandMedian(arr){
    if (!Array.isArray(arr) || !arr.every(item => typeof item === 'number')){ //Array.isArray() is a method that checks if a value is an array
        return false;
    }
    else {
        let sum = 0;
        for (let i = 0; i<arr.length; i++){
            sum += arr[i];
        }
        let avg = sum/arr.length;
        let median = 0;
        if (arr.length % 2 === 0){
            median = (arr[arr.length/2 - 1] + arr[arr.length/2])/2; //if the length of the array is even then the median is the average of the two middle numbers
        }
        else {
            median = arr[Math.floor(arr.length/2)]; //if the length of the array is odd then the median is the middle number
        }
        return "Average: " + avg + " Median: " + median;
    }
}

function find4Digits(str){
    if (typeof str !== 'string'){
        return false;
    }
    const numbers = str.split(' '); // Split the string into an array of numbers
    for (let i = 0; i < numbers.length; i++) {
        if (/^\d{4}$/.test(numbers[i])) { // Check if the number is exactly 4 digits
            return numbers[i];
        }

    }
    return false; // Return false if no 4-digit number is found
}

app.get("/", (req, res) => {
    const path = require("path");
    res.sendFile(path.join(__dirname, "A3_Q1.html"));
});

app.post("/findSummation", (req, res) => {
    const n = parseInt(req.body.number, 10);
    const result = findSummation(n);
    res.send(`Summation result: ${result}`);
});

app.post("/uppercaseFirstandLast", (req, res) => {
    const str = req.body.uppercaseString;
    const result = uppercaseFirstandLast(str);
    res.send(`Uppercased result: ${result}`);
});

app.post("/findAverageandMedian", (req, res) => {
    const arr = JSON.parse(req.body.numArray);
    const result = findAverageandMedian(arr);
    res.send(`Average and Median: ${result}`);
});

app.post("/find4Digits", (req, res) => {
    const str = req.body.numString;
    const result = find4Digits(str);
    res.send(`4-digit number found: ${result}`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
}
);