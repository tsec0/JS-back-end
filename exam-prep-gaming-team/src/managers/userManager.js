// import User schema from User.js
const User = require('../models/User');

// import and use jwt and bcrypt
const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt');

// use previously generated SECRET
const { SECRET } = require('../config/config');

// token generation
async function generateToken(user){
    // generate token
    const payload = {
       _id: user._id,
       username: user.username,
       email: user.email,
   };

   const token = await jwt.sign(payload, SECRET, { expiresIn: '1d' }); // expiresIn: -> is not needed

   return token;
}

// login user functionality
exports.login = async (email, password) => {

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid user or password');
    }

    // check password
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new Error('Invalid user or password');
    }

    const token = await generateToken(user);

    return token;
};

// register user functionality
exports.register = async (registerData) => {
    const user = await User.findOne({ username: registerData.username });
    // user validation
    if(user){
        throw new Error('Username already exists!');
    }

    const createUser = await User.create(registerData);
    
    const token = await generateToken(createUser);

    return token;
};


