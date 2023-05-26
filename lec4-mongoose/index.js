const mongoose = require("mongoose");

const Cat = require('./models/Cat');

const connectionStr = "mongodb://127.0.0.1:27017";

async function connectDb(){
    await mongoose.connect(connectionStr + "/cats");

    console.log('Db Connected successfully!');

    // const cats = await Cat.find({name: 'Sisa', breed : 'Angora'}); // returns a specific write

    const cats = await Cat.find({}); // returns all writes

    cats.forEach(cat => cat.greet());

    // console.log(cats);
}

connectDb();
