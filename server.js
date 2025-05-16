const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs'); // For file system operations
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, './views')); // Set the views directory
app.use(express.static(path.join(__dirname, './public'))); // Serve static files(CSS, JS, images).
app.use(cookieParser()); // For parsing cookies
app.use(express.urlencoded({ extended: true })); // For parsing form data

//define routes for page

app.get('/', (req, res) => {
    const username = req.cookies.username; // Get the username from cookies
    res.render('template', {
        title:'Home',
        cssFile: 'A1_Q8_HOMEPAGE.css',
        content: 'homepage',
        username: username,
    })
});

app.get('/find-pet', (req,res) => {
    const username = req.cookies.username; // Get the username from cookies
    res.render('template', {
        title:'Find a Pet',
        cssFile: 'A1_Q8_FINDPET.css',
        content: 'findPet',
        username: username,
    })
});
app.get('/dog-care', (req,res) => {
    const username = req.cookies.username; // Get the username from cookies
    res.render('template', {
        title:'Dog Care',
        cssFile: 'A1_Q8_DOGCARE.css',
        content: 'dogCare',
        username: username,
    })
});
app.get('/cat-care', (req,res) => {
    const username = req.cookies.username; // Get the username from cookies
    res.render('template', {
        title:'Cat Care',
        cssFile: 'A1_Q8_CATCARE.css',
        content: 'catCare',
        username: username,
    })
});
app.get('/giveaway', (req,res) => {
    const username = req.cookies.username;

    if (!username) {
        return res.render('template', {
            title: 'Login Required',
            cssFile: 'createAcc.css',
            content: 'login', // Redirect to the login page
            username: null,
            errorMessage: null,
        });
    }
    res.render('template', {
        title:'Giveaway',
        cssFile: 'A1_Q8_GIVEAWAY.css',
        content: 'giveaway',
        username: username,
    })
});
app.post('/giveaway', (req, res) => {
    const username = req.cookies.username;

    // Extract form data
    const { pet, dogbreed, otherdog, catbreed, age, gender, behavior, bragabout } = req.body;

    // Determine the breed (either selected or entered manually)
    const breed = pet === 'dog' ? (dogbreed === 'none' ? otherdog : dogbreed) : catbreed;

    // Read the pets file to get the current counter
    fs.readFile('./clientData/pets.txt', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err);
            return res.status(500).send('Server error');
        }

        const lines = data ? data.split('\n').filter(line => line.trim() !== '') : [];
        const counter = lines.length + 1;

        // Format the pet information
        const petInfo = `${counter}:${username}:${pet}:${breed}:${age}:${gender}:${behavior}:${bragabout}\n`;

        // Append the pet information to the pets file
        fs.appendFile('./clientData/pets.txt', petInfo, err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error');
            }

            // Send a success response
            res.render('template', {
                title: 'Pet Registered',
                cssFile: 'success.css',
                content: 'petSuccess', // Render a success message
            });
        });
    });
});
app.get('/contact', (req,res) => {
    const username = req.cookies.username; // Get the username from cookies
    res.render('template', {
        title:'Contact',
        cssFile: 'A1_Q8_CONTACT.css',
        content: 'contact',
        username: username,
    })
});
app.get('/privacy', (req,res) => {
    const username = req.cookies.username; // Get the username from cookies
    res.render('template', {
        title:'Privacy',
        cssFile: 'A1_Q8_PRIVACY.css',
        content: 'privacy',
        username: username,
    })
});
app.get('/create-account', (req, res) => {
    const username = req.cookies.username; // Get the username from cookies
    res.render('template', {
        title: 'Create an Account',
        cssFile: 'createAcc.css', // Reuse the same CSS file
        content: 'createAccount',
        errorMessage: null, // Initialize error message as null
        username: username, // Pass the username to the template
    });
});
app.post('/create-account', (req, res) => {
    const {username, password} = req.body; 

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;

    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        return res.render('template', {
            title: 'Create an Account',
            cssFile: 'createAcc.css',
            content: 'createAccount',
            errorMessage: 'Invalid username or password. please make sure password contains at least 1 digit.'
        });
    }

    // Check if username already exists
    fs.readFile('./clientData/login.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        const users = data.split('\n');
        const userExists = users.some(user => user.split(':')[0] === username); 

        if (userExists) {
            return res.render('template', {
                title: 'Create an Account',
                cssFile: 'createAcc.css',
                content: 'createAccount',
                errorMessage: 'Username already exists. Please try a different one.'
            });
        }

        // Append new user to login file
        const newUser = `${username}:${password}\n`;
        fs.appendFile('./clientData/login.txt', newUser, err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error');
            }
            res.render('template', {
                title: 'User Registered',
                cssFile: 'success.css',
                content: 'userSuccess', //this segment will be used to show the success message
            });
        });
    });
});

app.get('/login', (req, res) => {
    const username = req.cookies.username; // Get the username from cookies
    res.render('template', {
        title: 'Login',
        cssFile: 'createAcc.css',
        content: 'login',
        errorMessage: null, // Initialize error message as null
        username: username, // Pass the username to the template
    });
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Read the login file to check for existing users
    fs.readFile('./clientData/login.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        const users = data.split('\n');
        const user = users.find(user => {
            const [fileUsername, filePassword] = user.split(':');
            return fileUsername === username && filePassword === password;
        });

        if (user) {
            // Set a cookie for the logged-in user
            res.cookie('username', username, { maxAge: 900000, httpOnly: true });
            // Redirect to the homepage after successful login
            res.redirect('/');
        } else {
            res.render('template', {
                title: 'Login Failed',
                cssFile: 'createAcc.css',
                content: 'login',
                errorMessage: 'Invalid username or password. Please try again.'
            });
        }
    });
});
app.get('/logout', (req, res) => {
    // Clear the cookie and redirect to the homepage
    res.clearCookie('username');
    res.render('template', {
        title: 'Logout Successful',
        cssFile: 'success.css',
        content: 'logout', // Render the logout.ejs file
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







