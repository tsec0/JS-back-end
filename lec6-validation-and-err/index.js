const express = require('express');

const app = express();

const { isAgeValid, isNameValid } = require('./utils/validation');
const { validateName } = require('./middleware/middlewares');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`
    <form action="" method="POST">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name">

        <label for="age">Age:</label>
        <input type="number" name="age" id="age">

        <input type="submit" value="Create">
    </form>`);
});

app.post('/', validateName, (req, res) => {
    const { name, age } = req.body;

    if(!isAgeValid(age)){
        return res.send('Invalid age!');
    }
    
    console.log(name, age);
    res.send('Successfull');
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));
