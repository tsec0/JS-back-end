//console.log('Hello from express');
const express = require('express');

// Configurations
const expressConfig = require('./config/expressConfig'); // express configurator
const handlebarsConfig = require('./config/handlebarsConfig'); // handlebars configurator
const dbConnect = require('./config/dbConfig'); // mongodb confogurator

// Routes
const routes = require('./routes');

// Express variable
const app = express();

// Configured PORT
const PORT = 5000;

//Express config
expressConfig(app);

// Handlebars config
handlebarsConfig(app);

// Data Base Connection with error
dbConnect()
    .then(() => { console.log('DB connected sucessfully!') })
    .catch(err => { console.log('DB error: ', err); });

// Routes
app.use(routes);

// Listening
app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));
