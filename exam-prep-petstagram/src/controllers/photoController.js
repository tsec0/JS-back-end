const router = require("express").Router();

const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const photos = await photoManager.getAll().lean(); // returns a query -> lean returns a collection -> catalog

    res.render('photos', { photos }); // it finds index.hbs for catalog
});

router.get('/create', (req, res) => {
    res.render('photos/create');
});

router.post('/create', async (req, res) => {
    // attach user to photo
    const photoData = {
        ...req.body,
        owner: req.user._id,
    };

    // error handling
    try {
        await photoManager.create(photoData);

        res.redirect('/photos');
    } catch(err){
        res.render('photos/create', { error: getErrorMessage(err) });
    }
});

router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    try {
        const photo = await photoManager.getOne(photoId).lean();
        const isOwner = req.user?._id == photo.owner._id; // .populate('owner') => its the object owner, so we add ._id

        res.render('photos/details', { photo, isOwner });
    } catch(err){

    }
});

router.get('/:photoId/delete', async (req, res) => {
    const photoId = req.params.photoId;
    try {
        await photoManager.delete(photoId);

        res.redirect('/photos');
    } catch(err){
        res.render(`/photos/details`, {error: 'Unsuccessful deletion of photo'})
    }
});

module.exports = router;
