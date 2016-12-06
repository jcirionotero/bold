const proxyquire = require('proxyquire');

const paths = require('../paths');
const LoopbackMock = require('../../helpers/loopback-mock');

describe('server extensions', () => {
  let loopback;
  let Server;

  beforeEach(() => {
    loopback = LoopbackMock.getMock();
    Server = loopback.models.Server;

    proxyquire(`${paths.common.extensions}/server.js`, {
      '../../server/server.js': loopback
    })();
  });

  describe('getOnline', () => {
    describe('when the random number is true', () => {
      beforeEach(() => {
        spyOn(Math, 'random').and.returnValue(0.7);
      });

      it('should reject the promise', done => {
        Server.getOnline().then(null, error => {
          expect(error.message).toBe('No online servers.');
          expect(error.statusCode).toBe(400);
          expect(error.code).toBe('Error');
          done();
        });
      });
    });

    describe('when the random number is false', () => {
      beforeEach(() => {
        spyOn(Math, 'random').and.returnValue(0.3);
      });

      it('should resolve the promise with the generated data', done => {
        Server.getOnline().then(servers => {
          expect(servers.length).toBe(4);
          expect(servers[0].priority).toBeDefined();
          done();
        });
      });
    });
  });
});
