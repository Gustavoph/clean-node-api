const { HttpResponse } = require('../helpers')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    const params = ['email', 'password']
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }

    for (const param of params) {
      if (!httpRequest.body[param]) {
        return HttpResponse.badRequest(param)
      }
    }

    const { email, password } = httpRequest.body
    this.authUseCase.auth(email, password)
  }
}
