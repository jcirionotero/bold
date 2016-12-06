module.exports = loopback => {
  const authenticationBootScript = new AuthenticationBootScript(loopback);
  authenticationBootScript.enableAuthentication();
};

class AuthenticationBootScript {
  constructor (loopback) {
    this.loopback = loopback;
  }

  enableAuthentication () {
    this.loopback.enableAuth();
  }
}
