const router = require('express').Router();

const homeController = require('./controllers/homeController'); // homeController
const cubeController = require('./controllers/cubeController'); // cubeController

//Route controller -> middleware / module routs controller
router.use(homeController);
router.use('/cubes', cubeController);

// 404 Page
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;
