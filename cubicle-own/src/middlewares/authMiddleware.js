// validate token
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');


exports.auth = async (req, res, next) => {
    // check wether there is a cookie - chrome dev tools - application cookies - http://.. - name
    const token = req.cookies['token/auth'];
    if(token){
        try {
            const user = await jwt.verify(token, SECRET);

            req.user = user;

            next(); // move forward / continue
        } catch(err){
            res.clearCookie('auth');

            res.redirect('/users/login');
        }
    } else {
        next(); // move forward / continue
    }
};