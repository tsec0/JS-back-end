const Animal = require('../models/Animal');

exports.getAll = () => Animal.find().populate('owner');

exports.getOne = (animalId) => Animal.findById(animalId).populate('owner');

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.create = (animalData) => Animal.create(animalData);

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.getByOwner = (userId) => Animal.find({ owner: userId });

exports.addUser = async (animalId, user) => {
    const animal = await Animal.findById(animalId);
    
    animal.donations.push(user);

    return animal.save();
};

exports.findUser = async (animalId, user) => {
    const animal = await Animal.findById(animalId);
    
    return animal.donations.some(obj => obj !== user._id) ? false : true;
}

exports.getFromSearch = async (search) => {
    let result = await Animal.find().lean();

    if(search){
        result = result.filter(animal => animal.location.toLowerCase().includes(search.toLowerCase()));
    }

    return result;
};
