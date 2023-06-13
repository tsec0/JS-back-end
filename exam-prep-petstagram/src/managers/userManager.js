const User = require('../models/User');

const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt');

const { SECRET } = require('../config/config');


exports.login = async (username, password) => {
    // find user by username
    const user = await User.findOne({ username });
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

exports.register = async (registerData) => {
    const user = await User.findOne({ username: registerData.username });
    // user validation
    if(user){
        throw new Error('Username already exists!');
    }

    const createdUser = await User.create(registerData);
    
    const token = await generateToken(createdUser);

    return token;
};

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
