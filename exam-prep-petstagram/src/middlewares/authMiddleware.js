const jwt = require('../lib/jwt');

const { SECRET, TOKEN_KEY } = require('../config/config');

exports.auth = async (req, res, next) => {
    const token = req.cookies[TOKEN_KEY]; // there might not be a token
    if(token){
        try {
            const decodedToken = await jwt.verify(token, SECRET); // returns the user

            // for valid token and the log-in is valid
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;

            next(); // call the next middleware
        } catch(err){
            res.clearCookie(TOKEN_KEY); // clear token

            res.redirect('users/login');
        }
    } else {
        next();
    }
}

exports.isAuth = (req, res, next) => {
    if(!req.user){
        res.redirect('users/login')
    }
    // else forward to next middleware
    next();
}