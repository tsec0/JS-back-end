// console.log("Server started!");
const express = require('express');

const routes = require('./routes');

const app = express();

const PORT = 5000; // listening port
const mesage_log = 'Server is listening on port 5000...'; // message after starting server

// express middleware setup
app.use(express.static('public')); // static(.css; images) file folder -> public
app.use(express.urlencoded({ extended: false }));

// router set up
app.use(routes);

app.listen(PORT, console.log(mesage_log));
