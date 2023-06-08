// validate token
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');


exports.auth = async (req, res, next) => {
    // check wether there is a cookie - chrome dev tools - application cookies - http://.. - name
    const token = req.cookies['token/auth'];
    if(token){
        try {
            const user = await jwt.verify(token, SECRET); // decoded token or payload

            // locals -> can access variables by the view engine
            req.user = user;
            res.locals.user = user;
            res.locals.isAuthenticated = true;

            next(); // move forward / continue
        } catch(err){
            res.clearCookie('auth');

            res.redirect('/users/login');
        }
    } else {
        next(); // move forward / continue
    }
};

exports.isAuthed = (req, res, next) => {
    if (!req.user){
        // if threre is a chance coolkie not to be cleaned -> res.clearCookie('token/auth');
        return res.redirect('/users/login');
    }

    next();
};
