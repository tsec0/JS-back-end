// require packages
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const app = express();

// mongoose connect -> change db name
mongoose.connect(`mongodb://127.0.0.1:27017/petstagram`) // returns promise
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log('DB error', err.message));

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
app.use(cookieParser());

// router set up
app.use(routes);

// server listening
app.listen(PORT, console.log(mesage_log));
