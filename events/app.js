'use strict';

const hub = require('./hub');
const fs = require('fs');
const readFile = require('./readFile');
const toUpper = require('./toUpper');
const writeFile = require('./writeFile');
require('./logger');
require('./network-logger');

const alterFile = (file) => {
  return readFile(file)
    .then(text => toUpper(text))
    .then(text => writeFile(file, text))
    .catch(err => {
      hub.emit('error', err);
    });
};

let file = process.argv.slice(2).shift();
alterFile(file);
