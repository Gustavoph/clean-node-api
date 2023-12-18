import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  it('should return 400 if no name is provided', async () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        password_confirmation: 'any_paassword'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
