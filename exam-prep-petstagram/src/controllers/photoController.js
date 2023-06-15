const router = require("express").Router();

const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');

// catalog
router.get('/', async (req, res) => {
    const photos = await photoManager.getAll().lean(); // returns a query -> lean returns a collection -> catalog

    res.render('photos', { photos }); // it finds index.hbs for catalog
});

// create
router.get('/create', isAuth, (req, res) => {
    res.render('photos/create');
});

router.post('/create', isAuth, async (req, res) => {
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

// details
router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    try {
        const photo = await photoManager.getOne(photoId).populate('comments.user').lean(); // returns a query and can populate here
        const isOwner = req.user?._id == photo.owner._id; // .populate('owner') => its the object owner, so we add ._id

        res.render('photos/details', { photo, isOwner });
    } catch(err){

    }
});

// delete
router.get('/:photoId/delete', isAuth, async (req, res) => {
    const photoId = req.params.photoId;
    try {
        await photoManager.delete(photoId);

        res.redirect('/photos');
    } catch(err){
        res.render(`/photos/details`, {error: 'Unsuccessful deletion of photo'})
    }
});

// edit
router.get('/:photoId/edit', isAuth, async(req, res) => {
    const photo = await photoManager.getOne(req.params.photoId).lean();
    res.render('photos/edit', { photo });
});

router.post('/:photoId/edit', isAuth, async(req, res) => {
    const photoId = req.params.photoId;
    const photoData = req.body;
    try {
        await photoManager.edit(photoId, photoData);

        res.redirect(`/photos/${photoId}/details`);
    } catch (err) {
        res.render('photo/edit', { error: 'Unable to edit/update photo!', ...photoData }); // ...photoData population and fill in form
    }
});

// comments
router.post('/:photoId/comments', isAuth, async (req, res) => {
    const photoId = req.params.photoId;
    const { message } = req.body;
    const user = req.user._id;

    // try catch should be added
    await photoManager.addComment(photoId, { user, message });
    res.redirect(`/photos/${photoId}/details`);

});

module.exports = router;
