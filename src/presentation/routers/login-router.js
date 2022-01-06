const { HttpResponse } = require('../helpers')
const { MissingParamError, InvalidParamError } = require('../errors')

module.exports = class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const params = ['email', 'password']
      const { email, password } = httpRequest.body
      for (const param of params) {
        if (!httpRequest.body[param]) {
          return HttpResponse.badRequest(new MissingParamError(param))
        }
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }
      return HttpResponse.ok({ accessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
