const Cube = require('../models/Cube');

// exports.getAll = () => db.cubes.slice();
exports.getAll = async (search, from, to) => {
    let result = await Cube.find().lean();

    // TODO: use mongoose to filter in the db
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

// await is not needed here; returns a query from doc
// this is a request ; query generation
exports.getOne = (cubeId) => Cube.findById(cubeId);


// cubeData = {name, description, difficultyLevel, imageUrl};
exports.create = async (cubeData) => {
    const cube = new Cube(cubeData);

    await cube.save();

    return cube;
}
