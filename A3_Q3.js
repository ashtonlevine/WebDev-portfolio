const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));  // For parsing form data

//give the form to the client
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/A3_Q3.html');
}
);

//handle the form submission
app.post('/submittion', (req, res) => {
    const {name, phone} = req.body;

    //verify that the phone number is in the correct format

    const validPhone = /^\d{3}-\d{3}-\d{4}$/;

    if (validPhone.test(phone)){ //tests to see if phone is the same format as validPhone
        res.send(`Thank you ${name}, your phone number ${phone} has been submitted.`);
    }
    else {
        res.send('Invalid phone number format. Please enter a phone number in the format xxx-xxx-xxxx');
    }
}
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

