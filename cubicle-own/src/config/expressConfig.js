const express = require('express');
const path = require('path');

function expressConfig(app){
    app.use(express.static(path.resolve(__dirname, '..', 'public'))); // path is used to configure the root folder -> src/public
    app.use(express.urlencoded({ extended: false })); // req.body req.query
}

module.exports = expressConfig;
