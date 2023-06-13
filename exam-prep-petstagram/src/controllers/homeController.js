const router = require('express').Router();

// Add controller routes

// home controller
router.get('/', (req, res) => {
    // console.log('User is:', req.user);
    res.render('home');
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;