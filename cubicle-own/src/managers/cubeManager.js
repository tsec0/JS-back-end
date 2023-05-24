const uniqid = require('uniqid');
// const db = require('../db.json');
const cubes = [];

// exports.getAll = () => db.cubes.slice();
exports.getAll = () => cubes.slice();

// cubeData = {name, description, difficultyLevel, imageUrl};
exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData, // spread the received variables (and values) in the received cubeData
    };

    // db.cubes.push(newCube);
    cubes.push(newCube);

    return newCube;
}
