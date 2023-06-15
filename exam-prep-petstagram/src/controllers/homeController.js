const router = require('express').Router();

const photoManager = require('../managers/photoManager');

const { isAuth } = require('../middlewares/authMiddleware');

// Add controller routes

// home controller
router.get('/', (req, res) => {
    res.render('home');
});

// 404 controller
router.get('/404', (req, res) => {
    res.render('404');
});

//profile controller
router.get('/profile',  isAuth, async (req, res) => {
    const photos = await photoManager.getByOwner(req.user._id).lean(); // needs leaning

    res.render('profile', { photos, photoCount: photos.length });
});

module.exports = router;