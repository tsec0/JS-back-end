// jsonwebtoken set up
const jsonwebtoken = require('jsonwebtoken');
const util = require('util');

// promisify jsonwebtoken
const jwt = {
    sign: util.promisify(jsonwebtoken.sign),
    verify: util.promisify(jsonwebtoken.verify),
};

module.exports = jwt;
