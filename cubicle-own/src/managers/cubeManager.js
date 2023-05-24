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

exports.getOne = (cubeId) => cubes.find(x => x.id == cubeId);

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
