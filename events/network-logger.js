const hub = require('./hub');
const net = require('net');
const client = new net.Socket();

const LOGGER_PORT = process.env.LOGGER_PORT || 3000;
const LOGGER_HOST = process.env.LOGGER_HOST || 'localhost';

client.connect(LOGGER_PORT, LOGGER_HOST, initializeLogger);
client.on('error', (err) => {
  console.error('Connection has failed, so you have failed.', err);
});

function initializeLogger() {
  console.log('Network logger connected! YIPPEE!');

  hub.on('saved', log('saved'));

  function log(eventType) {
    return payload => {
      let json = JSON.stringify({
        eventType,
        payload,
      });
      client.write(`${json}\r\n`);
    };
  }
}
