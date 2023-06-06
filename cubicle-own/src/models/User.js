const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        // validation inside model / model level validation
        // validate: {
        //     validator: function(value) {
        //         return this.repeatPassword === value;
        //     },
        //     message: `Password missmatch!`
        // }
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

const User = mongoose.model('User', userSchema);

module.exports = User;
