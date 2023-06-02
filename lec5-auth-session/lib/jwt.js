const jwt = require('jsonwebtoken'); // only callbacks and no promises

// promise based function
jwt.sign();
const sign = (payload, secret, options) => { // function signature

    // convert from callback to promise
    const promise = new Promise((resolve, reject) => {

        //executor fuinction
        jwt.sign(payload, secret, options, (err, result) => {
            if(err) {
                return reject(err);
            }

            resolve(result);
        });
    });

    return promise;
}

const verify = (token, secret) => { // function signature

    // convert from callback to promise
    const promise = new Promise((resolve, reject) => {

        //executor fuinction
        jwt.verify(token, secret, (err, result) => {
            if(err) {
                return reject(err);
            }

            resolve(result);
        });
    });

    return promise;
}

const jwtPromises = {
    sign,
    verify,
};

module.exports = jwtPromises;
