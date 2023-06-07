const { promisify } = require('util');
const jsonwebtoken = require('jsonwebtoken'); // does not support promise

const jwt = {
    // from callback to promise
    sign: promisify(jsonwebtoken.sign), // we loose signature 
    verify: promisify(jsonwebtoken.verify),
};

module.exports = jwt;
