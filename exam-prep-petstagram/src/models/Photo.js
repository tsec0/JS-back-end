const mongoose = require('mongoose');

// Photo schema for mongo database
const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    image: {
        type: String,
        required: [true, 'Image Url is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
