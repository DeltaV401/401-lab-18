const net = require('net');
const client = new net.Socket();

const PORT = process.env.PORT || 3000;

client.connect(PORT, 'localhost', () => {
  console.log(`Running on ${PORT}`);
});

client.on('data', data => {
  console.log('log', data.toString());
});

client.on('close', () => {
  console.log('Goodbye human.');
});
