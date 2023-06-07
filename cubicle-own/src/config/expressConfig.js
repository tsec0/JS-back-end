const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { auth } = require('../middlewares/authMiddleware');

function expressConfig(app){
    app.use(express.static(path.resolve(__dirname, '..', 'public'))); // path is used to configure the root folder -> src/public
    app.use(express.urlencoded({ extended: false })); // req.body req.query
    app.use(cookieParser());
    app.use(auth);
}

module.exports = expressConfig;
