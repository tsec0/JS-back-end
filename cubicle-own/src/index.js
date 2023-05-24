//console.log('Hello from express');
const express = require('express');

const expressConfig = require('./config/expressConfig'); // expressConfigurator
const handlebarsConfig = require('./config/handlebarsConfig'); // handlebarsConfigurator
const homeController = require('./controllers/homeController'); // homeController
const cubeController = require('./controllers/cubeController'); // cubeController

const app = express();

const PORT = 5000;

//Express config
expressConfig(app);

// Handlebars config
handlebarsConfig(app);

//Route controller -> middleware / module routs controller
app.use(homeController);
app.use('/cubes', cubeController);

app.listen(PORT , () => console.log(`Server is running on ${PORT}...`));
