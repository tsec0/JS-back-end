const router = require('express').Router();

// Add controller routes

// home controller
router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;