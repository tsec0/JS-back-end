const mongoose = require('mongoose');

// Create schema
const catSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Name is required!'],
        minLength: [3, 'Minimum of 3 characters are required!'],
        maxlength: [20, 'Maximum of 20 characters are allowed!'],
    },
    color: {
        type: String,
        required: false,
        enum: {
            values: ['white', 'black', 'yellow'],
            message: '{VALUE} is a wrong color!',
        },
    },
    age: Number,
    breed: String,
});

// Add method
// instanse method
// catSchema.method('greet', function(){}); -> you can do that as well
catSchema.methods.greet = function(){ // use expression not arrow functions
    console.log(`Hello I\m cat and my name is ${this.name}.`); // instanse of a model
};

//crerate virtual property (getter)
catSchema.virtual('info').get(function(){
    return `My name is ${this.name} and I'm ${this.age} years old!`
});

// static model method
catSchema.static('giveMeCats', function(){
    return this.find({age: 12});
});

// Create Model
const Cat = mongoose.model('Cat', catSchema); // auto pluralise

// Export Model
module.exports = Cat;
