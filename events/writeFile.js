'use strict';

const fs = require('fs');
const hub = require('./hub');
const promisify = require('./util/promisify');

const writeFile = promisify(fs.writeFile);

function fileWriter(file, text) {
  return writeFile(file, Buffer.from(text))
    .then(() => hub.emit('saved',file));
}

module.exports = fileWriter;
