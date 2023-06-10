const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = require('../controllers/userController');

// mongoose Schema
const userSchema = new mongoose.Schema({
    // validate if user exists -> unique
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'Username length is short!'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
        uniqe: true,
        maxLength: 20,
    },
    password: {
        type: String,
        // validation inside model / model level validation
        validate: {
            validator: function(value){
                //return this.repeatPassword === value;
                return /^[A-Za-z0-9]+$/.test(value);
            },
            message: `Invalid password characters!`,
        },
        required: true,
        minLength: [8, 'Password length is short!'],
    }, // needs to be hashed
});

// repeatPassword should not be saved in the db
// using virtuals - its written in the doc but not in the db
userSchema.virtual('repeatPassword')
    .set(function(value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Password missmatch!');
        }
    });

// next is used for async functions
userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10);

    this.password  = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
