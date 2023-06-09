const express = require('express');
const validator = require('validator');

const app = express();

const { isAgeValid } = require('./utils/validation');
const { validateName } = require('./middleware/middlewares');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`
    <form action="" method="POST">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name">

        <label for="age">Age:</label>
        <input type="number" name="age" id="age">

        <label for="password">Password:</label>
        <input type="password" name="password" id="password">

        <input type="submit" value="Validate">
    </form>`);
});

app.post('/', validateName, (req, res) => {
    const { name, age, password } = req.body;

    if(!isAgeValid(age)){
        return res.send('Invalid age!');
    }

    if(!validator.isStrongPassword(password)){
        return res.send('Weak password');
    }

    console.log(name, age);
    res.send('Successfull');
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));
