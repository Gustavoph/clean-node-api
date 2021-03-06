const { loginRouter } = require('../composers/login-router')
const expressRouterAdapter = require('../adapters/express-router-adapter')

module.exports = router => {
  router.post('/login', expressRouterAdapter.adapt(loginRouter))
}
