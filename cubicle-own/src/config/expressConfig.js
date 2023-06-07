const express = require('express');
const path = require('path');
const cokieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');

function expressConfig(app){
    app.use(express.static(path.resolve(__dirname, '..', 'public'))); // path is used to configure the root folder -> src/public
    app.use(express.urlencoded({ extended: false })); // req.body req.query
    app.use(cookieParser());
}

module.exports = expressConfig;
