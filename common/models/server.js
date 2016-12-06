const ModelConf = require('../classes/model-conf.js');
const serverExtensions = require('../extensions/server.js');

module.exports = function (Server) {
  const logConf = new ServerConf(Server);
  logConf.setup();
  serverExtensions();
};

class ServerConf extends ModelConf {

  disableRemoteMethods () {
    this._disableServerRemoteMethod();
  }

  addRemoteMethods () {
    this._createServerRemoteMethod();
  }

  _disableServerRemoteMethod () {
    this.model.disableRemoteMethod('create', true);
    this.model.disableRemoteMethod('upsert', true);
    this.model.disableRemoteMethod('upsertWithWhere', true);
    this.model.disableRemoteMethod('updateAll', true);
    this.model.disableRemoteMethod('updateAttributes', false);

    this.model.disableRemoteMethod('find', true);
    this.model.disableRemoteMethod('findById', true);
    this.model.disableRemoteMethod('findOne', true);

    this.model.disableRemoteMethod('deleteById', true);

    this.model.disableRemoteMethod('count', true);
    this.model.disableRemoteMethod('exists', true);

    this.model.disableRemoteMethod('replaceById', true);
    this.model.disableRemoteMethod('replaceOrCreate', true);
    this.model.disableRemoteMethod('createChangeStream', true);
  }

  _createServerRemoteMethod () {
    this.model.remoteMethod(
      'getOnline',
      {
        'accessType': 'READ',
        'description': 'Returns online servers.',
        'returns': {
          'arg': 'servers', 'type': 'array', 'root': true
        },
        'http': { 'path': '/online', 'verb': 'get' }
      }
    );
  }
}
