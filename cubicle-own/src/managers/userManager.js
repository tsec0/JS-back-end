const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
    // find user
    const user = await User.findOne({ username });
    if(!user){
        throw new Error('Cannot find registration!')
    }

    // validate password
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new Error('Wrong user name or password!')
    }

    // build a token
    const payload = {
        _id: user._id,
        username: user.username,
    }
    const token = jwt.sign(payload, SECRET, { expiresIn: '2d' });

    // return token
    return token;

}
// user validation logic
