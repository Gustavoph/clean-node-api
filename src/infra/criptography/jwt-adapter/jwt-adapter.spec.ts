import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: (): string => {
    return 'any_token'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

export const throwError = (): never => {
  throw new Error()
}

describe('Jwt Adapter', () => {
  it('should call sign with correct values', async () => {
    const secret = 'secret'
    const sut = new JwtAdapter(secret)
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenLastCalledWith({ id: 'any_value' }, secret)
  })

  it('should return a token on sign success', async () => {
    const secret = 'secret'
    const sut = new JwtAdapter(secret)
    const accessToken = await sut.encrypt('any_value')
    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
    const promise = sut.encrypt('any_id')
    await expect(promise).rejects.toThrow()
  })
})
