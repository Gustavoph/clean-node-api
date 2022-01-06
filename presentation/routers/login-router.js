const { HttpResponse } = require('../helpers')

module.exports = class LoginRouter {
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
  }
}
