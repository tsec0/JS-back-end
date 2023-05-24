const homeController = require('../controllers/homeController');

function routesConfig(app){
    app.get('/', homeController.getHome);
}

module.exports = routesConfig;