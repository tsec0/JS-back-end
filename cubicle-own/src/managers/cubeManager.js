const Cube = require('../models/Cube');

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
// check if field has reference (and make request to existing writes)
exports.getOne = (cubeId) => Cube.findById(cubeId).populate('accessories'); 
exports.getOneWithAccessories = (cubeId) => this.getOne(cubeId).populate('accessories'); // referes to getOne -> this

// cubeData = {name, description, difficultyLevel, imageUrl};
exports.create = async (cubeData) => {
    const cube = new Cube(cubeData); // document -> not clean js object
    await cube.save();

    return cube;
};

exports.update = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData);

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);

exports.attachAccessory = async (cubeId, accessoryId) => {
    return Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessoryId } });
}