const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid');

const app = express();

app.use(cookieParser()); // middleware

app.get('/', (req, res) => {
    // let id -> because we use the id later in the .get() scope and we set unique cookie to the id
    // in that way tyhe browser wont set again another cookie
    let id = uuid(); 

    const userId = req.cookies['userId'];

    if(userId){
        id = userId;
    } else {
        res.cookie('userId', id);
    }

    res.send(`Hello Express - ${id}`);
});

app.listen(5000, () => console.log('Serrver is listening on port 5000...'));
