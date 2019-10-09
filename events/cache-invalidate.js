let cache = {};

const hub = require('./hub');

hub.on('cache-invalidate', payload => {
  cache[payload.name] = payload;
  console.log('cache', cache);
});
