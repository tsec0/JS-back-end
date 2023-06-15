const mongoose = require('mongoose');

// Photo schema for mongo database
const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name should be at least 2 characters'],
    },
    image: {
        type: String,
        required: [true, 'Image Url is required'],
        match: [/^[https]|[http]?\/\//, 'Invalid URL'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [1, 'Age should be at least 1 year'],
        max: [100, 'Age should not be above 100 years']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Description should be at least 5 characters'],
        maxLength: [50, 'Description should be at least 50 characters'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [5, 'Location should be at least 5 characters'],
        maxLength: [50, 'Location should be at least 50 characters'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
        },
    }]
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
