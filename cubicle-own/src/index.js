//console.log('Hello from express');
const express = require('express');

const expressConfig = require('./config/expressConfig'); // expressConfigurator
const handlebarsConfig = require('./config/handlebarsConfig'); // handlebarsConfigurator
const routesConfig = require('./config/routesConfig'); // routesConfogurator

const app = express();

const PORT = 5000;

//Express config
expressConfig(app);
// require('./config/expressConfig')(app); // immediately invoked function

// Handlebars config
handlebarsConfig(app);

//Routes config
routesConfig(app);


app.listen(PORT , () => console.log(`Server is running on ${PORT}...`));
