const Photo = require('../models/Photo');

exports.getAll = () => Photo.find().populate('owner'); // owner to be passed as an object

exports.getOne = (photoId) => Photo.findById(photoId).populate('owner');

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.create = (photoData) => Photo.create(photoData);
