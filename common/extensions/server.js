const Q = require('q');
const extend = require('extend');

const loopback = require('../../server/server.js');
const commonUtils = require('../utils/common.js');

const getOnline = () => {
  const deferred = Q.defer();
  const randomNumber = Math.random() >= 0.5;

  if (randomNumber) {
    deferred.reject(commonUtils.buildError('No online servers.', 400, 'Error'));
    return deferred.promise;
  }

  deferred.resolve(generateServersPriority());
  return deferred.promise;
};

const generateServersPriority = () => {
  const rawData = [
    {
      'name': 'DoesNotExist',
      'url': 'http://doesNotExist.boldtech.co'
    },
    {
      'name': 'Boldtech',
      'url': 'http://boldtech.co'
    },
    {
      'name': 'Offline',
      'url': 'http://offline.boldtech.co'
    },
    {
      'name': 'Google',
      'url': 'http://google.com'
    }
  ];

  return rawData.map(server => {
    server.priority = Math.floor(Math.random() * 10);
    return server;
  });
};

const serverExtensions = {
  'getOnline': getOnline
};

module.exports = () => {
  loopback.once('started', () => {
    const Server = loopback.models.Server;
    extend(true, Server, serverExtensions);
  });
};
