const fs = require('fs');

const readStream = fs.createReadStream('./text.txt');
const writeStream = fs.createWriteStream('./output.txt');

readStream.pipe(writeStream); // .pipe().pipe() -> we can do that

