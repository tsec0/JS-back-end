const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        // generate JWT token
        const payload = { username }
        jwt.sign(payload, secret, { expiresIn: '2d' }, (err, token) => {
            if(err){
                return res.redirect('/404');
            }

            // Set jwt token as cookie
            res.cookie('token', token);
            res.redirect('/profile');
        }); // async generation - we use a callback = (err, token) => {}
    } else {
        res.status(401).send('Unauthorised');
        res.redirect('/login');
    }
});

app.get('/profile', (req, res) => {
    // Get token from cookie
    const token = req.cookies['token'];

    // verify token
    if(token){
        jwt.verify(token, secret, (err, payload) => { // the payload is the decoded token!
            if(err){
                return res.status(401).send('Unauthorised!');
            }
            // allow request if valid
            return res.send(`Profile: ${payload.username}`);
        });
    }

    // redirect to page if unauthoorised or invalid token
    res.redirect('/login');
});

app.listen(5000, () => console.log('Serrver is listening on port 5000...'));
