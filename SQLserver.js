const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MySQL
const pool = mysql.createPool({ //this creates a connection pool to the MySQL database which can be used to query the database
    connectionLimit: 10, //this is the maximum number of connections that can be created at once
    host           : 'localhost', //this is the hostname of the database server
    user           : 'root', //this is the username to connect to the database server
    password       : '', //this is the password to connect to the database server
    database       : 'nodejs_beers' //this is the name of the database to connect to
});

//Get all beers in the the database

app.get('/', (req, res) =>{

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);
//can use the query() method that is formatted as connection.query(sqlString, callback)
        connection.query('SELECT * from beers', (err, rows) => { //this will select all rows from the beers table
            connection.release(); //return the connection to pool

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    });
}); //this is a route that listens for GET requests to the root URL of the server

//get a beer by id
app.get('/:id', (req, res) =>{ //need to put :id to specify that this is a parameterized route

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query('SELECT * from beers WHERE id = ?',[req.params.id], (err, rows) => { //this will select all rows from the beers table
            connection.release(); //return the connection to pool

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    });
});

//Delete a record/beer
app.delete('/:id', (req, res) =>{ //need to put :id to specify that this is a parameterized route

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query('DELETE from beers WHERE id = ?',[req.params.id], (err, rows) => { //this will select all rows from the beers table
            connection.release(); //return the connection to pool

            if (!err) {
                res.send(`Beer with the record ID ${[req.params.id]} has been removed.`);
            } else {
                console.log(err);
            }
        });
    });
});

// add a record/beer
app.post('', (req, res) =>{ //need to remove :id to specify that this is not a parameterized route

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const params = req.body; //this will select all rows from the beers table


        connection.query('INSERT INTO beers SET ?', params , (err, rows) => { // INSERT INTO beers SET ? is the SQL query that will insert a new row into the beers table
            connection.release(); //return the connection to pool

            if (!err) {
                res.send(`Beer with the name: ${[params.name]} has been added.`);
            } else {
                console.log(err);
            }
        });
        console.log(req.body);
    });
});
//NOTE to do a POST request in postman, 
//1. select POST from the dropdown
//2. enter the URL
//3. select the Body tab
//4. select raw
//5. select JSON from the dropdown
//6. enter the JSON dataa
//7. click send
//EXAMPLE OF DATA:
// {
//     "name": "Guinness",
//     "tagline": "Guinness is the best",
//     "description": "Ireland blah blah blah",
//     "image": "image url"
// }


//Update a record/beer
app.put('', (req, res) =>{ //need to remove :id to specify that this is not a parameterized route

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const {id, name, tagline, description, image} = req.body; // setting the variables to the req.body parser


        connection.query('UPDATE beers SET name = ?, tagline = ?, description = ?  WHERE id = ?', [name, tagline, description, id] , (err, rows) => { // UPDATE, SET, WHERE are the SQL keywords that will update the name of a beer in the beers table
            connection.release(); //return the connection to pool

            if (!err) {
                res.send(`Beer with the name: ${name} has been added.`);
            } else {
                console.log(err);
            }
        });
        console.log(req.body);
    });
});






//Listem on environment port or 3000
app.listen(port, () => console.log( `Server is running on port ${port}`));