exports.validateName = (req, res, next) => {
    if(!req.body.name || req.body.name.length < 3){
        return res.status(404).send('Invalid name!');
    }
    next();
};

exports.validateAge = (req, res, next) => {
    if(!req.body.age || req.body.age < 0 || req.body.age > 100){
        return res.status(404).send('Invalid age!');
    }
    next();
}
