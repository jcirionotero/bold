class PromiseSpy {

  resolve (value, name) {
    return jasmine.createSpy(name).and.callFake(() => Promise.resolve(value));
  }

  reject (value, name) {
    return jasmine.createSpy(name).and.callFake(() => {
      value = value || new Error();
      return Promise.reject(value);
    });
  }

}

module.exports = new PromiseSpy();
