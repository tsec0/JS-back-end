const mongoose = require('mongoose');

// Create schema
const catSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    age: Number,
    breed: String,
});

//Add method
catSchema.methods.greet = function(){ // use expression not arrow functions
    console.log(`Hello I\m cat and my name is ${this.name}.`); // instanse of a model
};

// Create Model
const Cat = mongoose.model('Cat', catSchema); // auto pluralise

// Export Model
module.exports = Cat;
