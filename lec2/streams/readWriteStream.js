const { log } = require('console');
const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt')); // ./lec2/streams/
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'output.txt')); // ./lec2/streams/

// Copying a file using a chunk (chunks)
// Read Stream -> Write Stream -> pipe()

readStream.on('data', (chunk) => {
    writeStream.write(chunk);
});

readStream.on('end', () => {
    log('End of Stream');
    writeStream.end();
});
