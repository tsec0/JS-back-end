const cubes = [];

exports.getAll = () => cubes.slice();

// cubeData = {name, description, difficultyLevel, imageUrl};
exports.create = (cubeData) => {
    const newCube = {
        id: cubes.length + 1,
        ...cubeData, // spread the received variables (and values) in the received cubeData
    };

    cubes.push(newCube);

    return newCube;
}
