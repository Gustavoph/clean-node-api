import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: (): string => {
    return 'any_token'
  }
}))

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const secret = 'secret'
    const sut = new JwtAdapter(secret)
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenLastCalledWith({ id: 'any_value' }, secret)
  })

  it('Should return a token on sign success', async () => {
    const secret = 'secret'
    const sut = new JwtAdapter(secret)
    const accessToken = await sut.encrypt('any_value')
    expect(accessToken).toBe('any_token')
  })
})
