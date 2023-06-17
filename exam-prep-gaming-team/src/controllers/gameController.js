// use router for views
const router = require("express").Router();

const gameManager = require('../managers/gameManager');
const { getErrorMessage } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');

// catalog controller
router.get('/', async (req, res) => {
    games = await gameManager.getAll().lean(); // returns a query -> lean returns a collection -> catalog

    res.render('game', { games }); // it finds index.hbs for catalog
});

// create controller
router.get('/create', isAuth, (req, res) => {
    res.render('game/create');
});

router.post('/create', isAuth, async (req, res) => {
    // attach user to photo
    const gameData = {
        ...req.body,
        owner: req.user._id,
    };

    // error handling
    try {
        await gameManager.create(gameData);

        res.redirect('/game');
    } catch(err){
        res.render('game/create', { error: getErrorMessage(err) });
    }
});

// details
router.get('/:gameId/details', async (req, res) => {
    const gameId = req.params.gameId;
    const game = await gameManager.getOne(gameId).populate('boughtBy.user').lean(); // returns a query and can populate here
    const logged = req.user?._id;
    const isOwner = logged == game.owner._id; // its the objects owner, so we add ._id
    const hasBought = logged != game.boughtBy._id;
    res.render('game/details', { game, isOwner, logged, hasBought });
});

// boughtBy
router.get('/:gameId/buy', isAuth, async (req, res) => {
    const gameId = req.params.gameId;
    const user = req.user._id;
    
    await gameManager.addUser(gameId, { user });
    res.redirect(`/game/${gameId}/details`);
});

// delete
router.get('/:gameId/delete', isAuth, async (req, res) => {
    const gameId = req.params.gameId;
    try {
        await gameManager.delete(gameId);

        res.redirect('/game');
    } catch(err){
        res.render(`/game/details`, {error: 'Unsuccessful deletion of photo'});
    }
});

// edit
router.get('/:gameId/edit', isAuth, async(req, res) => {
    const game = await gameManager.getOne(req.params.gameId).lean();
    res.render('game/edit', { game });
});

router.post('/:gameId/edit', isAuth, async(req, res) => {
    const gameId = req.params.gameId;
    const gameData = req.body;
    try {
        await gameManager.edit(gameId, gameData);

        res.redirect(`/photos/${gameId}/details`);
    } catch (err) {
        res.render('photo/edit', { error: 'Unable to edit/update photo!', ...gameData }); // ...gameData population and fill in form
    }
});

module.exports = router;
