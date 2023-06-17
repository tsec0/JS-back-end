// router import and definition
const router = require('express').Router();

// home controller
router.get('/', (req, res) => {
    res.render('home');
});

// 404 controller
router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;