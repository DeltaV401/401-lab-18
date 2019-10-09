'use strict';

const net = require('net');
const uuid = require('uuid');

const PORT = process.env.PORT || 3000;
const server = net.createServer();

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}.`);
});

const socketPool = {};

server.on('connection', socket => {
  const id = uuid();
  socket.id = id;
  socketPool[id] = socket;

  console.log(`${id} connected to the party! ${Object.keys(socketPool).length} people are now partying!`);

  for(let socketId in socketPool) {
    socketPool[socketId].write(`${id} connected to the party!\r\n`);
  }

  socket.on('data', dataHandler);
  socket.on('error', err => {
    console.error(err);
  });
  socket.on('close', () => {
    console.log(`Kicking ${id} out for trying to leave. ${Object.keys(socketPool).length} people still know how to party.`);
    delete socketPool[id];
  });
});

function dataHandler(buffer) {
  let id = this.id;
  console.log(id, buffer.toString());

  for(let socketId in socketPool) {
    if(socketId === id) continue;

    socketPool[socketId].write(`${id}: ${buffer.toString()}\r\n`);
  };
};
