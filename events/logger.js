'use strict';

const hub = require('./hub');

hub.on('saved', (file) => console.log(`${file} was saved!`));
