// express, handlebars set up and import
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const path = require('path');

// middleware set up
const { auth } = require('./middlewares/authMiddleware');
const routes = require('./routes');

// mongoose connect
mongoose.connect(`mongodb://127.0.0.1:27017/gamingteam`) // returns promise
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log('DB error', err.message));

// express declaration
const app = express();

// configure port and massage for listening
const PORT = 3000; // listening port
const mesage_log = `Server is listening on port ${PORT}...`; // message after starting server

// configure views (rendering/handlebars)
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// express middleware setup
app.use(express.static(path.resolve(__dirname, 'public'))); // static(.css; images) file folder -> public
app.use(express.urlencoded({ extended: false })); // bodyparser
app.use(cookieParser()); // cookie parser usage
app.use(auth); //should be after the cookie parser

// router set up
app.use(routes);

// server start up and listening
app.listen(PORT, console.log(mesage_log));