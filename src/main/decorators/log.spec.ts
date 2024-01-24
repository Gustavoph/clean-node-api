import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('Log Decorator', () => {
  it('should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = {
          statusCode: 200,
          body: { name: 'Gustavo' }
        }
        return await Promise.resolve(httpResponse)
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
