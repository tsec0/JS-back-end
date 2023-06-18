// import and use router
const router = require('express').Router();

// import managers, token key, error message handling/helping
const userManager = require('../managers/userManager');
const { TOKEN_KEY } = require('../config/config');
const { getErrorMessage } = require('../utils/errorHelper');

// login page control
router.get('/login', (req, res) => {
    res.render('users/login'); // views/users/login
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body; // here user/can be set

    try {
        const token = await userManager.login(email, password);
        res.cookie(TOKEN_KEY, token); // set cookie in response
        res.redirect('/');
    } catch (err) {
        res.render('users/login', { error: getErrorMessage(err) });
    }
});

// register page control
router.get('/register', (req, res) => {
    res.render('users/register'); // views/users/register
});

router.post('/register', async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    try {
        const token = await userManager.register({ email, password, repeatPassword });

        res.cookie(TOKEN_KEY, token);
        res.redirect('/');
    } catch (err) {
        res.render('users/register', { error: getErrorMessage(err), email });
    }
});

// logout control
router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_KEY);

    res.redirect('/');
});

module.exports = router;