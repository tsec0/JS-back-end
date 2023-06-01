const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();

app.get('/', (req, res) => {
    // let id -> because we use the id later in the .get() scope and we set unique cookie to the id
    // in that way tyhe browser wont set again another cookie
    let id = uuid(); 

    // Cookies
    // console.log(req.header('Cookie'));
    // console.log(req.headers['cookie']); // http comunication

    const cookie = req.header('Cookie');

    if(cookie){
        const [key, value] = cookie.split('=');
        id = value;
    } else {
        res.header('Set-Cookie', `userId=${id}`);
    }

    res.send(`Hello Express - ${id}`);
});

app.listen(5000, () => console.log('Serrver is listening on port 5000...'));
