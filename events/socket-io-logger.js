'use strict';

const hub = require('./hub');

const io = require('socket.io-client');
const socket = io.connect('http//localhost:3000');

initializeLogger();

function initializeLogger() {
  console.log('Pocket socket locket connockted');

  hub.on('saved', log('saved'));

  function log(eventType) {
    return payload => {
      socket.emit(eventType, payload);
    };
  }
}