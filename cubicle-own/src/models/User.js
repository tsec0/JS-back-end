const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = require('../controllers/userController');

const userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        // validation inside model / model level validation
        
    }, // needs to be hashed
});

// validate if user exists



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
