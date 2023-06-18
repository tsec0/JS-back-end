const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name is too short']
    },
    years: {
        type: Number,
        required: [true, 'Number is required'],
        min:[0, 'Age starts from 0'],
        max:[100, 'Age ends too 100']
    },
    kind: {
        type: String,
        required: [true, 'Kind is required'],
        minLength:[3, 'Kind is too short']
    },
    image: {
        type: String,
        required: [true, 'Image Url is required'],
        match: [/^[https]|[http]?\/\//, 'Invalid URL'],
    },
    need: {
        type: String,
        required: [true, 'Need is required'],
        minLength:[3, 'Need is too short'],
        maxLength:[20, 'Kind is too long']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength:[5, 'Need is too short'],
        maxLength:[15, 'Kind is too long']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength:[10, 'Description is too short'],
        maxLength:[50, 'Description is too long']
    },
    donations: [{
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
