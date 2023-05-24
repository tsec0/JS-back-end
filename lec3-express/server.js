const express = require('express');

const handlebars = require('express-handlebars');

const path = require('path');

const app = express();

const port = 5000;

const {addCat, getCats} = require('./db');

//Add handlebars to express (set the view engine)
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');


// Add third party middleware
const bodyParser = express.urlencoded({ extended: false });
app.use(bodyParser);

app.use(express.static('public')); // Static files such as .css and .html ,fonts, icon, images is stored in 'public'

// Add middlewares
app.use((req, res, next) => { // next is a function as a parameter
    console.log(`HTTP Request ${req.method}: ${req.path}`);
    next();
    // res.end();
});

app.use((req, res, next) => {
    console.log('middleware one');
    next(); // go to the next function
});

// Route based middleware
app.use('/cats', (req, res, next) => {
    console.log('Route middleware');
    next();
});

// Partial route based middleware
app.use('/cats', (req, res, next) => {
    console.log('Partial (Cats) route middleware');
    next();
});

// Route spceific middleware
const specificMiddleware = (req, res, next) => {
    console.log('Specific middleware only for this route!');
    next();
}
app.get('/specific',specificMiddleware, (req, res) => {
        res.send('Some specific route with middleware!');
});

// Express router / Actions
// app.METHOD(PATH, HANDLER) - HANDLER => (req, res (, next))
// action => handler(function) - the arrow function = web action; (+ http method + path) 
app.get('/', (req, res) =>  { // when first parameter is not used and we can replce it with "_"
    //res.status(200).send('<h1>Hello from Express!</h1>');
    // res.render('home', { layout: false }); // handlebars -> home.handlebars with no layout
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/cats', (req, res) => {
    const cats = getCats();
    res.render('cats', {cats});
});

app.post('/cats', (req, res) => {
    addCat(req.body.name, Number(req.body.age))
    //res.status(201).send('Cat has been created!')
    res.redirect('/cats');
});

app.get('/cats/:catId', (req, res) => {
    const param = req.params;
    const catId = Number(param.catId); // convert the string into number
    if(!catId){
        res.status(404).send('Cannot find a cat!');
        return;
    }
    console.log(param);
    res.send(`<h1>Request with PARAMETER -> Id = ${catId}!</h1>`);
});

app.get('/download', (req, res) => {
    // res.download('./cat-project.pdf');
    res.sendFile(path.resolve(__dirname, 'cat-project.pdf')); // open file in the browser
    // res.attachment('./cat-project.pdf'); // should add res.end()
    // res.end();
});

app.get('/old-route', (req, res) => {
    res.redirect('/cats');
});

app.get('*', (req, res) => {
    res.status(404).send('<h1>Not found!<h1>');
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
