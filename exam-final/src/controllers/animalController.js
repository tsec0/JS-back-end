// use router for views
const router = require("express").Router();

const animalManager = require('../managers/animalManager');
const { getErrorMessage } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');

// dashboard route controller
router.get('/', async (req, res) => {
    animals = await animalManager.getAll().lean(); // returns a query -> lean returns a collection -> catalog

    res.render('animal', { animals }); // it finds index.hbs for catalog
});

// create route controller
router.get('/create', isAuth, (req, res) => {
    res.render('animal/create');
});

router.post('/create', isAuth, async (req, res) => {
    // attach user to animal
    const animalData = {
        ...req.body,
        owner: req.user._id,
    };

    // error handling
    try {
        await animalManager.create(animalData);

        res.redirect('/animal');
    } catch(err){
        res.render('animal/create', { error: getErrorMessage(err) }); 
    }
});

// details route controller
router.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId;
    const animal = await animalManager.getOne(animalId).populate('donations.user').lean(); // returns a query and can populate here
    let isOwner = null;
    let hasDonated = false;
    const logged = req.user;
    if(logged){
        isOwner = logged._id == animal.owner._id; // its the objects owner, so we add ._id
        hasDonated = await animalManager.findUser(animalId, logged);
    }
    console.log(hasDonated);
    res.render('animal/details', { animal, isOwner, logged, hasDonated });
});

// donation route controller
router.get('/:animalId/donation', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const user = req.user._id;
    try {
        await animalManager.addUser(animalId,  { user });
        
        res.redirect(`/animal/${animalId}/details`);
    } catch(err){
        res.render('animal', {error: 'Unsuccessful donation'});
    }
});

// delete route controller
router.get('/:animalId/delete', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    try {
        await animalManager.delete(animalId);

        res.redirect('/animal');
    } catch(err){
        res.render('animal', {error: 'Unsuccessful deletion'});
    }
});

// edit route controller
router.get('/:animalId/edit', isAuth, async(req, res) => {
    const animal = await animalManager.getOne(req.params.animalId).lean();
    res.render('animal/edit', { animal });
});

router.post('/:animalId/edit', isAuth, async(req, res) => {
    const animalId = req.params.animalId;
    const animalData = req.body;
    try {
        await animalManager.edit(animalId, animalData);

        res.redirect(`/photos/${animalId}/details`);
    } catch (err) {
        res.render('photo/edit', { error: 'Unable to edit/update photo!', ...animalData }); // ...animalData population and fill in form
    }
});

module.exports = router;
