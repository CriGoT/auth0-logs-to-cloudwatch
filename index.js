const path = require('path');
const nconf = require('nconf');

// Initialize configuration.
nconf
  .argv()
  .env()
  .file(path.join(__dirname, './server/config.json'))
  .defaults({
    NODE_ENV: 'development',
    HOSTING_ENV: 'default',
    PORT: 3001,
    WT_URL: 'http://localhost:3000'
  });

// Start the server.
const app = require('./server')((key) => nconf.get(key), null);

const port = nconf.get('PORT');
app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Listening on http://localhost:${port}.`);
  }
});
