const router = require('express').Router();

// Add controller routes
const homeController = require('./controllers/homeController');

router.use(homeController); // it is not needed to add '/home'

module.exports = router;