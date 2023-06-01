const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const { v4: uuid } = require('uuid');

const app = express();

// middleware
app.use(cookieParser()); 
app.use(expressSession({
        secret: 'my secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
        }
}))

app.get('/', (req, res) => {
    // let id -> because we use the id later in the .get() scope and we set unique cookie to the id
    // in that way tyhe browser wont set again another cookie
    let id = '';

    const userId = req.cookies['userId'];

    if(userId){
        id = userId;
        console.log('User secret: ', req.session.secret);
    } else {
        id = uuid();
        req.session.secret = `some secret - ${id}`;
        res.cookie('userId', id, { httpOnly: true }); // cookie not visible -> secure
    }

    res.send(`Hello Express - ${id}`);
});

app.listen(5000, () => console.log('Serrver is listening on port 5000...'));
