'use strict';

const fs = require('fs');
const promisify = require('./util/promisify');

const readFile = promisify(fs.readFile);

function fileReader(file) {
  return readFile(file)
    .then(buffer => buffer.toString());
}

module.exports = fileReader;
