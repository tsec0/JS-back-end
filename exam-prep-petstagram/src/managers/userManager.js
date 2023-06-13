const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (loginData) => {
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
};

exports.register = async (registerData) => {
    const user = await User.findOne({ username: registerData.username });
    // user validation
    if(user){
        throw new Error('Username already exists!');
    }

    return User.create(registerData);
};
