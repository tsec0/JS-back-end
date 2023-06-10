const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// mongoose Schema
const userSchema = new mongoose.Schema({
    // validate if user exists -> unique
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [3, 'Username length is too short!'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric!'],
        uniqe: {
            value: true,
            message: "Username has already been taken!",
        },
        maxLength: [20, 'Username length is too long!'],
    },
    password: {
        type: String,
        // validation inside model / model level validation
        required: [true, 'Password is required!'],
        validate: {
            validator: function(value){
                return /^[A-Za-z0-9]+$/.test(value);
            },
            message: 'Invalid password characters!'
        },
        minLength: [8, 'Password length is short!'],
    }, // needs to be hashed
});

// repeatPassword should not be saved in the db
// using virtuals - its written in the doc but not in the db
userSchema.virtual('repeatPassword')
    .set(function(value) {
        if (value !== this.password) {
            throw new Error('Password missmatch!');
        }
    });

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10);

    this.password  = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
