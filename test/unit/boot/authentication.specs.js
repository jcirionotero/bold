const proxyquire = require('proxyquire');

const paths = require('../paths');
const LoopbackMock = require('../../helpers/loopback-mock');

describe('authentication boot script', () => {
  let loopback;

  beforeEach(() => {
    loopback = LoopbackMock.getMock();
    loopback.enableAuth = jasmine.createSpy('loopback.enableAuth');

    proxyquire(`${paths.boot.path}/authentication.js`, {})(loopback);
  });

  it('should enable authentication', () => {
    expect(loopback.enableAuth.calls.count()).toEqual(1);
  });
});
