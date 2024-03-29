import { type Request, type Response } from 'express'
import { type Controller, type HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = { body: { ...request.body } }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 || httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
