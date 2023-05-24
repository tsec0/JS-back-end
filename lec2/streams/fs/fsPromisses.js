const { log } = require('console');
const fs = require('fs/promises');

fs.readFile('./text.txt', 'utf-8')
.then(
    data => {
        return fs.writeFile('./output.txt', data, 'utf-8');
    })
.then(() => {
    console.log('File saved');
})