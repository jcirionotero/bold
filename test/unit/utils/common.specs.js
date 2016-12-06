const proxyquire = require('proxyquire');

const paths = require('../paths');

describe('common utils', () => {
  let commonUtils;

  beforeEach(() => {
    commonUtils = proxyquire(`${paths.common.utils}/common.js`, {});
  });

  describe('method: buildError', () => {
    let buildErrorReturnValue;

    beforeEach(() => {
      buildErrorReturnValue = commonUtils.buildError();
    });

    it('should return an error', () => {
      expect(buildErrorReturnValue).toEqual(jasmine.any(Error));
    });
  });
});
