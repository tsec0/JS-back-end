// router import and declaration
const router = require('express').Router();

// Importing controller routes
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const gameController = require('./controllers/gameController');
const searchController = require('./controllers/searchController');

// Use controllers in router
router.use(homeController); // it is not needed to add '/home' just a '/' http://localhost:3000/
router.use('/users', userController); // here we need the /users to load http://localhost:3000/users
router.use('/game', gameController); // load view for /game http://localhost:3000/game
router.use('/search', searchController); // load view for /search http://localhost:3000/search

// 404 page route if not met controller
router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;