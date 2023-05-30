const Cube = require('../models/Cube');

const { request } = require('express');
const uniqid = require('uniqid');
// const db = require('../db.json');
const cubes = [
    {
        id: '2yvdusli1ncvnq',
        name: '1',
        description: '2',
        imageUrl: '3',
        difficultyLevel: 3
    },

    {
        id: '3yvdusli1ncvnq',
        name: '1',
        description: '2',
        imageUrl: '4',
        difficultyLevel: 4
    }
];

// exports.getAll = () => db.cubes.slice();
exports.getAll = (search, from, to) => {
    let result = cubes.slice();

    if(search){
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(from){
        result = result.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if(to){
        result = result.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return result;
};

exports.getOne = (cubeId) => Cube.findById(cubeId); // await is not needed here

// cubeData = {name, description, difficultyLevel, imageUrl};
exports.create = async (cubeData) => {
    const cube = new Cube(cubeData);

    await cube.save();

    return cube;
}
