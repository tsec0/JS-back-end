const User = require('../models/User');

const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt');

const SECRET = '22ce71ac-306e-4479-bb97-4fd2c6cb9b29';

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

    // generate token
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '1d' }); // expiresIn: -> is not needed

    return token;
};

exports.register = async (registerData) => {
    const user = await User.findOne({ username: registerData.username });
    // user validation
    if(user){
        throw new Error('Username already exists!');
    }

    return User.create(registerData);
};
