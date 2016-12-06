class ModelConf {

  constructor (model) {
    this.model = model;
  }

  setup () {
    this.disableRemoteMethods();

    this.addRemoteMethods();

    this.addRemoteHooks();

    this.addOperationHooks();

    this.addValidations();
  }

  disableRemoteMethods () {
  }

  addRemoteMethods () {
  }

  addRemoteHooks () {
  }

  addOperationHooks () {
  }

  addValidations () {
  }

}

module.exports = ModelConf;
