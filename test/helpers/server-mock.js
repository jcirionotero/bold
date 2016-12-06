class ServerMock {

  getMock () {
    const server = {
      'dataSources': {
        'mongods': {
          'autoupdate': jasmine.createSpy('autoupdate')
        }
      },
      '@noCallThru': true
    };
    return server;
  }

}

module.exports = new ServerMock();
