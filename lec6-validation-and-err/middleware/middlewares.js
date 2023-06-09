exports.validateName = (req, res) => {
    if(!req.body.name || req.body.name.length < 3){
        return res.status(404).send('Invalid name!');
    }
    // return res.status(200);
};

exports.validateAge = (req, res) => {
    if(!req.body.age || req.body.age < 0 || req.body.age > 100){
        return res.status(404).send('Invalid age!');
    }
    // return res.status(200);
}
