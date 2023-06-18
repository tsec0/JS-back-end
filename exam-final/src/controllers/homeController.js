// router import and definition
const router = require('express').Router();

// import animal manger to visualize animals
const animalManager = require('../managers/animalManager');

// home controller
router.get('/', async (req, res) => {
    animals = await animalManager.getAll().lean(); // returns a query -> lean returns a collection -> catalog

    res.render('home', { animals });
});

// 404 controller
router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;