const router = require('express').Router();

const animalManager = require('../managers/animalManager');

const { isAuth } = require('../middlewares/authMiddleware');

// search controller
router.get('/', isAuth, async (req, res) => {
    const { search } = req.query;

    const animals = await animalManager.getFromSearch(search);

    res.render('search', { animals, search }); // property games with its value
});

module.exports = router;