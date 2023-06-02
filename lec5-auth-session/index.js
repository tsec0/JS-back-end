const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

const app = express();

// middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const users = {};

app.get('/', (req, res) => {
    console.log(users);

    res.send('Okay, we have users!');
});

app.get('/register', (req, res) => {
    // loads in the browser
    res.send(`
        <form method="POST" action="">
            <label for="username">username</label>
            <input type="text" name="username" id="username">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
            <input type="submit" value="Register">
        </form>`);
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(11); // the nuber depends on the hardware 
    const hash = await bcrypt.hash(password, salt); // the passwprd is hashed
    
    users[username] = {
        password: hash,
    };

    res.redirect('/login');
})

app.get('/login', (req, res) => {
    // loads in the browser
    res.send(`
        <form method="POST" action="">
            <label for="username">username</label>
            <input type="text" name="username" id="username">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
            <input type="submit" value="Login">
        </form>`)
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const hash = users[username]?.password; // is there a username with password
    const isValid = await bcrypt.compare(password, hash);

    if(isValid){
        res.send('Successfully logged in!');
        console.log(`Hash: ${hash}`);
    } else {
        res.send('Unauthorised');
    }
});

app.listen(5000, () => console.log('Serrver is listening on port 5000...'));
