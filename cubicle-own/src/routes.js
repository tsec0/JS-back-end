const router = require('express').Router();

const homeController = require('./controllers/homeController'); // homeController
const cubeController = require('./controllers/cubeController'); // cubeController
const accessoryController = require('./controllers/accessoryController'); //accessoryController
const userController = require('./controllers/userController'); // userController

//Route controller -> middleware / module routes controller
router.use(homeController);
router.use('/cubes', cubeController);
router.use('/accessories', accessoryController);
router.use('/users', userController);

// 404 Page
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;
