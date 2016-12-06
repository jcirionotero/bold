class LoopbackMock {

  getMock () {
    const loopback = {
      'once': jasmine.createSpy('loopback.once').and.callFake((event, listener) => {
        listener();
      }),
      'enableAuth': jasmine.createSpy(''),
      'models': {
        'Server': {}
      },
      '@noCallThru': true
    };
    return loopback;
  }

}

module.exports = new LoopbackMock();
