'use strict';

const socketIO = require('socket.io');
const uuid = require('uuid');

const PORT = process.env.PORT || 3000;
const server = socketIO(PORT);
console.log(`Listening on port ${PORT}.`);

server.on('connection', socket => {
  console.log(`You're connected!`, socket.id);

  socket.on('error', err => {
    console.error(err);
  });

  socket.on('send-chat', data => {
    server.emit('chat', data);
  });
});
