const router = require('express').Router();

// Add controller routes

// test action
router.get('/', (req, res) => {
    res.send('Tset action!');
});

module.exports = router;