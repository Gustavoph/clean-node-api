import { ServerError } from '../errors/server-error'
import { type HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 400,
  body: new ServerError()
})
