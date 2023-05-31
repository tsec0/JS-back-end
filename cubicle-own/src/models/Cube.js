const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [{ // many to many pairs -> [] ; 1 to many -> no []
        type: mongoose.Types.ObjectId,
        ref: 'Accessory',
    }],
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube; // for debugging purposes

//module.exports = mongoose.model('Cube', cubeSchema);
