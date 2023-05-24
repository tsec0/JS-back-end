const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip(); // stream instance 
const readStream = fs.createReadStream('./text.txt');
const writeStream = fs.createWriteStream('./output.txt');

readStream.pipe(gzip).pipe(writeStream); // three times piping -> transform stream // data -> compression -> writing

