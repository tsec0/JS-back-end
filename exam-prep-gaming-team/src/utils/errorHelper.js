// import and use error
const { MongooseError, Error } = require("mongoose");

// error decision manager
exports.getErrorMessage = (err) => {
    if (err instanceof MongooseError || err instanceof Error.ValidationError){
        return Object.values(err.errors).at(0).message;
    } else {
        return err.message;
    }
}
