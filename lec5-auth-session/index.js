const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('./lib/jwt');

const app = express();
const secret = 'SomeSortOfSecret!';

// middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const users = {};

app.get('/', (req, res) => {
    res.send('Hello');
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
    
    users[username] = { password: hash };

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
        try {
             // generate JWT token
            const payload = { username }
            const token = await jwt.sign(payload, secret, { expiresIn: '2d' });

            // Set jwt token as cookie
            res.cookie('token', token);
            res.redirect('/profile');
        } catch(err){
            console.log(err);
            res.redirect('/404');
        }
    } else {
        res.status(401).send('Unauthorised');
        res.redirect('/login');
    }
});

app.get('/profile', async (req, res) => {
    // Get token from cookie
    const token = req.cookies['token'];

    // verify token
    if(token){
        try {
            const payload = await jwt.verify(token, secret); // the payload is the decoded token!
            res.send(`Profile: ${payload.username}`);
        } catch(err){
            res.status(401).send('Unauthorised!');
        }
    }
    
    // redirect to page if unauthoorised or invalid token
    res.redirect('/login');
});

app.listen(5000, () => console.log('Serrver is listening on port 5000...'));
