const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/cubicle-may-2023';

async function dbConnect(){
    await mongoose.connect(uri); // no options added
}

// add listener for mistakes

module.exports = dbConnect;
