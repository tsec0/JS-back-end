const { log } = require('console');
const fs = require('fs');

const input = fs.readFileSync('./text.txt', { encoding: 'utf-8' });

log(input);
log('end');