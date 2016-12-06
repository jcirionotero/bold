module.exports = function (server) {
  // Install a `/` route that returns server status
  /* eslint new-cap: ["error", { "capIsNewExceptionPattern": "^server.loopback\.." }] */
  const router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
