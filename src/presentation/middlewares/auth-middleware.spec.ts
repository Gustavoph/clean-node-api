import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import { type HttpRequest } from '../protocols'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middleware', () => {
  it('should return 403 if no x-access-token if found exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpRequest: HttpRequest = {}
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
