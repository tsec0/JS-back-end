// require packages
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// middleware import and set up
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');
const routes = require('./routes');

const app = express();

// mongoose connect -> change db name
mongoose.connect(`mongodb://127.0.0.1:27017/petstagram`) // returns promise
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log('DB error', err.message));

// port and massage for listening
const PORT = 3000; // listening port
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
//should be after the cookie parser
app.use(auth);

// router set up
app.use(routes);

// behind the routes -> because of next()
// app.use(errorHandler);

// server listening
app.listen(PORT, console.log(mesage_log));
