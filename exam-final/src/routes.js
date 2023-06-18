// router import and declaration
const router = require('express').Router();

// Importing controller routes
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const animalController = require('./controllers/animalController');
const searchController = require('./controllers/searchController');

// implement controllers in routes
router.use(homeController); // it is not needed to add '/home' just a '/' http://localhost:3000/
router.use('/users', userController); // here we need the /users to load http://localhost:3000/users
router.use('/animal', animalController); // here we need the /animal to load http://localhost:3000/animal
router.use('/search', searchController); // here we need the /animal to load http://localhost:3000/search
// 404 page route if not met controller
router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;