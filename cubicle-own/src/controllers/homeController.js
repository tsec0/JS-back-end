const router = require('express').Router();
const cubeManager = require('../managers/cubeManager')

router.get('/', async (req, res) => {

    // req.params
    // req.body
    // req.query

    const { search, from, to } = req.query;

    const cubes = await cubeManager.getAll(search, from, to); // needs lean()

    res.render('index', { cubes }); // property cubes with its value
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;