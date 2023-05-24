const router = require('express').Router();

// URL -> Path /cubes/create
router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    console.log(req.body);

    // res.send('Form submitted');
    res.redirect('/');
});

module.exports = router;
