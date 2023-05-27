const mongoose = require("mongoose");

const Cat = require('./models/Cat');

const connectionStr = "mongodb://127.0.0.1:27017";

async function connectDb(){
    await mongoose.connect(connectionStr + "/cats");

    console.log('Db Connected successfully!');

    // const cats = await Cat.find({name: 'Sisa', breed : 'Angora'}); // returns a specific write
    const cats = await Cat.find({}); // returns all writes

    // cats.forEach(cat => cat.greet()); // instance method
    // cats.forEach(cat => console.log(cat.info)); // virtual property

    // console.log('The cats are:')
    // cats.forEach(cat => {
    //     cat.greet(); // we can pass data trough the method
    //     console.log(cat.info); // virtual property (cannot pass data)
    // });

    // static model method - its an array returned
    // const result = await Cat.giveMeCats();
    // console.log(result);

    // Read
    // the first find which meets/satisfies the requirement - findOne()
    // all that satisfy the requirement - findMany()
    // const cat = await Cat.findOne({age: 9}); 
    // const cat = await Cat.findOne({breed: 'Angora'});
    // const cat = await Cat.findById('6470bbb7b82c48ef484bd9f2');
    // console.log(cat);

    //Create
    // 1.
    // const newCat = new Cat({
    //     name: 'Zuza',
    //     age: 10,
    //     breed: 'Ulichna'
    // });
    // await newCat.save();
    // 2.
    // const newCat = await Cat.create({
    //     name: 'Charlie',
    //     age: 4,
    //     breed: 'Dog - Samoyed',
    // });

    //Update
    // 1. the BOT way
    // const charlie = await Cat.findOne({name: 'Charlie'});
    // charlie.age = 10;
    // await charlie.save();
    // 2. Native mongodb
    // await Cat.updateOne({name: 'Charlie'}, {$set: {age: 10}});
    // 3. The mongoose way extension
    // finding by Id and updating is a more bulletproof way to update
    // await Cat.findByIdAndUpdate('6471b0e4307b46ab602f743c', {$set: {name: 'Peter', age: 7, breed: 'Ulichna - prevazhodna'}});
    // await Cat.findByIdAndUpdate('6471b1da6002564a6da19012', {$set: {breed: 'Dog-malamute'}});

    // Remove
    // 1.
    // deleteOne() - only the FIRST write that meets the requirement is deleted
    // await Cat.deleteOne({name:'Peter'});
    // 2.
    // finding by Id and deleting is a bulletproof way to do a remove
    // await Cat.findByIdAndDelete('6471b0dc3e2a99336be9b779');

}

connectDb();
