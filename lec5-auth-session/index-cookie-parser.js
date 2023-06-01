const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

const app = express();

// middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    // let id -> because we use the id later in the .get() scope and we set unique cookie to the id
    // in that way tyhe browser wont set again another cookie
    let id = '';

    const userId = req.cookies['userId'];

    if(userId){
        id = userId;
        
    } else {
        id = uuid();

        res.cookie('userId', id, { httpOnly: true }); // cookie not visible -> secure
    }

    res.send(`Hello Express - ${id}`);
});

app.get('/login', (req, res) => {
    // loads in the browser
    res.send(`
        <form method="POST" action="">
            <label for="username">username</label>
            <input type="text" name="username" id="username">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
            <input type="submit" value="login">
        </form>`)
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(11); // the nuber depends on the hardware 
    const hash = await bcrypt.hash(password, salt);
    res.send(`Hash: ${hash}`);
    // console.log(`User: ${username}\nPass: ${password}`);
    // res.send('oki');
});

app.listen(5000, () => console.log('Serrver is listening on port 5000...'));
