const router = require('express').Router();

// Add controller routes

// test action
router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;