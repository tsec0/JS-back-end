const { log } = require('console');
const fs = require('fs');

fs.readFile('./text.txt', { encoding: 'utf-8' }, (err, text) => {
    if(err){
        log(err);
        return;
    }
    log(text);
});

log('end');
