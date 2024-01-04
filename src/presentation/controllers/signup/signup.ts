import { type Controller, type EmailValidator, type HttpRequest, type HttpResponse, type AddAccount } from './signup-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'password_confirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, password_confirmation } = httpRequest.body

      const isValidConfirmation = password === password_confirmation
      if (!isValidConfirmation) {
        return badRequest(new InvalidParamError('password_confirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({ name, email, password })
      return { body: 'ok', statusCode: 200 }
    } catch (error) {
      return serverError()
    }
  }
}
