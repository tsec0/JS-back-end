const { log } = require('console');
const fs = require('fs');

const readStream = fs.createReadStream('./text.txt', { highWaterMark: 10000, encoding:'utf-8' });

readStream.on('data', (chunk) => {
    log('Read chunk');
    log(chunk);
}); // data = chunck

readStream.on('end', () => {
    log('Reading data is finished');
})
