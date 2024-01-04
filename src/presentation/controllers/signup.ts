import { type Controller, type EmailValidator, type HttpRequest, type HttpResponse } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'password_confirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, password_confirmation } = httpRequest.body

      const isValidConfirmation = password === password_confirmation
      if (!isValidConfirmation) {
        return badRequest(new InvalidParamError('password_confirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return { body: 'ok', statusCode: 200 }
    } catch (error) {
      return serverError()
    }
  }
}
