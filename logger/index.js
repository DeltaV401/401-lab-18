const socketIoClient = require('socket.io-client');

const URL = process.env.URL || 'http://localhost:3000';

const client = socketIoClient.connect(URL);

console.log(`Listening through ${URL}.`);

client.on('chat', data => {
  console.log('CHAT', data.toString());
});
