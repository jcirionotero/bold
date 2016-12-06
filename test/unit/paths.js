const appRoot = require('app-root-path');

exports.common = {
  'models': `${appRoot}/common/models`,
  'setups': `${appRoot}/common/setups`,
  'extensions': `${appRoot}/common/extensions`,
  'utils': `${appRoot}/common/utils`
};

exports.boot = {
  'path': `${appRoot}/server/boot`
};
