const mongoose = require('mongoose');

// Create schema
const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
});

// Create Model
const Cat = mongoose.model('Cat', catSchema);

// Export Model
module.exports = Cat;
