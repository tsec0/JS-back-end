const Game = require('../models/Game');

exports.getAll = () => Game.find().populate('owner');

exports.getOne = (gameId) => Game.findById(gameId).populate('owner');

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

exports.create = (gameData) => Game.create(gameData);

exports.edit = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);

exports.getByOwner = (userId) => Game.find({ owner: userId });

exports.addUser = async (gameId, userData) => {
    const game = await Game.findById(gameId);

    game.boughtBy.push(userData);

    return game.save();
};

exports.getFromSearch = async (search) => {
    let result = await Game.find().lean();

    if(search){
        result = result.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
    }

    return result;
};
