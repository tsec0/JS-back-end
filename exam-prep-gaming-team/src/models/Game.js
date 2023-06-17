const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [4, 'Name is too short']
    },
    image: {
        type: String,
        required: [true, 'Image Url is required'],
        match: [/^[https]|[http]?\/\//, 'Invalid URL'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min:[0, 'Proce should be a positive number']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength:[10, 'Description is too short']
    },
    genre: {
        type: String,
        required: [true, 'Description is required'],
        minLength:[2, 'Genre is too short']
    },
    platform: {
        type: String,
        required: [true, 'Platform is required'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    boughtBy: [{
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    }],
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
