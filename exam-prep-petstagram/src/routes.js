const router = require('express').Router();

// Add controller routes
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const photoController = require('./controllers/photoController');

router.use(homeController); // it is not needed to add '/home' just http://localhost:5000/
router.use('/users', userController); // here we need the /users to load http://localhost:5000/users
router.use('/photos', photoController);// load view for catalog
// router.get('*', (req, res) => {
//     res.redirect('/404');
// });

module.exports = router;