import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) { return badRequest(new MissingParamError('email')) }
      if (!password) { return badRequest(new MissingParamError('password')) }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) { return badRequest(new InvalidParamError('email')) }
      return ok({})
    } catch (err) {
      return serverError(err)
    }
  }
}
