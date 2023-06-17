const router = require('express').Router();

const gameManager = require('../managers/gameManager');

const { isAuth } = require('../middlewares/authMiddleware');

// search controller
router.get('/', isAuth, async (req, res) => {
    const { search } = req.query;

    const games = await gameManager.getFromSearch(search);

    res.render('search', { games, search }); // property games with its value
});

module.exports = router;