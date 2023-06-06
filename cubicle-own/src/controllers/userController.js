const router = require('express').Router();

const userManager = require('../managers/userManager');

// render the html page
router.get('/register', (req, res) => {
    res.render('users/register');
});

// receive data
router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    // Validate password is a simple validation
    // So here the users validation is suitable to be done, 
    // but a user manager will be created

    await userManager.register({ username, password, repeatPassword });

    res.redirect('/users/login');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

module.exports = router;
