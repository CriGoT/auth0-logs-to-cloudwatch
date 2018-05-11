const path = require('path');
const server = require('auth0-log-extensions-base');
const { WebtaskStorageContext, FileStorageContext } = require('auth0-extension-tools');

const metadata = require('../webtask.json');
const sender = require('./sender');

module.exports = (configProvider, storageProvider) => {
  const options = {
    extensionName: 'auth0-logs-to-cloudwatch',
    extensionTitle: 'Logs To Cloudwatch',
    staticPath: path.join(__dirname, '../dist'),
    metadata: metadata,
    uiAssetsPath: false,
    sender
  };

  const storage = storageProvider
    ? new WebtaskStorageContext(storageProvider, { force: 1 })
    : new FileStorageContext(path.join(__dirname, './data.json'), { mergeWrites: true });

  return server(configProvider, storage, options);
};
