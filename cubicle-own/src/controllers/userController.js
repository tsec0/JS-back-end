const router = require('express').Router();

const userManager = require('../managers/userManager');

const { extractErrorMessages } = require('../utils/errorHelper');

// render the html page
router.get('/register', (req, res) => {
    res.render('users/register');
});

// receive data
router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    // a user manager will be created for validating passwords or smth else
    try {
        await userManager.register({ username, password, repeatPassword });
        res.redirect('/users/login');
    } catch(err){
        // expected error
        const errorMessages = extractErrorMessages(err);
        res.status(404).render('users/register', { errorMessages });
    }
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res)=> {
    const { username, password } = req.body;

    try { 
        const token = await userManager.login(username, password); // cannot continue if not resolved successfully
        res.cookie('token/auth', token, { httpOnly: true });
        res.redirect('/');

    } catch(err){
        // expected error
        // next(err) -> it means the middleware has to recycle the error
        const errorMessages = extractErrorMessages(err);
        res.status(404).render('users/login', { errorMessages });
}
});

router.get('/logout', (req, res) => {
    res.clearCookie('token/auth');
    res.redirect('/');
})

module.exports = router;
