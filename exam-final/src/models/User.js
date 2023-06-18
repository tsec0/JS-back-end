// import mongoose, bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// set up the user schema for mongo Db
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Email should be at least 10 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Password should be at least 4 characters'],
    }
});

// password validation
userSchema.virtual('repeatPassword')
.set(function(value){
    if(this.password !== value){
        throw new Error('Password missmatch');
    }
});

// hash password with bcrypt
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

// export schema
const User = mongoose.model('User', userSchema);
module.exports = User;