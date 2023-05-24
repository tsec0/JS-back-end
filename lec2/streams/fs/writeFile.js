const { log } = require('console');
const fs = require('fs');

const data = 'Mene me nema w celata shema!';

fs.writeFile('./output.txt', data, 'utf8', (err) => {
    if (err) {
        log('Unsuccessful file save!');
        return;
    }

    log('Successfully saved file!');
});