// import and declere jsonwebtoken
const jwt = require('../lib/jwt');

// import secret and token key
const { SECRET, TOKEN_KEY } = require('../config/config');

// auth middleware
exports.auth = async (req, res, next) => {
    const token = req.cookies[TOKEN_KEY]; // there might not be a token
    if(token){
        try {
            const decodedToken = await jwt.verify(token, SECRET); // returns the user

            // for valid token and the log-in is valid
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true; // accessible for all views

            next(); // call the next middleware
        } catch(err){
            res.clearCookie(TOKEN_KEY); // clear token

            res.redirect('users/login');
        }
    } else {
        // else forward to next middleware
        next();
    }
}

// is Auth middleware
exports.isAuth = (req, res, next) => {
    if(!req.user){
        res.redirect('users/login')
    }
    // else forward to next middleware
    next();
}