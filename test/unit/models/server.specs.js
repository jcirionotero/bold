const proxyquire = require('proxyquire');

const paths = require('../paths');

describe('server', () => {
  let ServerExtensions;
  let ServerModel;

  let server;

  beforeEach(() => {
    ServerExtensions = jasmine.createSpy('ServerExtensions');
    ServerExtensions['@noCallThru'] = true;

    ServerModel = {
      'remoteMethod': jasmine.createSpy('remoteMethod'),
      'disableRemoteMethod': jasmine.createSpy('disableRemoteMethod'),
      'observe': jasmine.createSpy('observe')
    };

    server = proxyquire(`${paths.common.models}/server.js`, {
      '../extensions/server.js': ServerExtensions
    });

    server(ServerModel);
  });

  it('should extend model', () => {
    expect(ServerExtensions).toHaveBeenCalled();
  });

  describe('api setup', () => {
    it('should add remote methods', () => {
      expect(ServerModel.remoteMethod.calls.count()).toEqual(1);
      expect(ServerModel.remoteMethod).toHaveBeenCalledWith('getOnline', jasmine.any(Object));
    });

    it('should disable remote methods', () => {
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledTimes(14);
    });

    it('should disable server remote methods', () => {
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('create', true);
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('upsert', true);
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('upsertWithWhere', true);
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('updateAll', true);
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('updateAttributes', false);

      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('find', true);
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('findById', true);
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('findOne', true);

      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('deleteById', true);

      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('count', true);
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('exists', true);

      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('replaceById', true);
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('replaceOrCreate', true);
      expect(ServerModel.disableRemoteMethod).toHaveBeenCalledWith('createChangeStream', true);
    });
  });
});
