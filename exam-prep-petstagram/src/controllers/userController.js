const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('users/login'); // views/users/login
});

router.get('/register', (req, res) => {
    res.render('users/register'); // views/users/register
});


module.exports = router;