// console.log("Server started!");
const express = require('express');
const handlebars = require('express-handlebars');

const path = require('path');

const routes = require('./routes');

const app = express();

// port and massage for listening
const PORT = 5000; // listening port
const mesage_log = 'Server is listening on port 5000...'; // message after starting server

// configure views
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// express middleware setup
app.use(express.static(path.resolve(__dirname, 'public'))); // static(.css; images) file folder -> public
app.use(express.urlencoded({ extended: false }));

// router set up
app.use(routes);

// server listening
app.listen(PORT, console.log(mesage_log));
