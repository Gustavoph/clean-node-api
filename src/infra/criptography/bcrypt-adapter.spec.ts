import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hashed_value')
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    expect(hashSpy).toHaveBeenCalledTimes(1)
  })

  it('should return a hash on success', async () => {
    const sut = makeSut()
    const hashed_value = await sut.encrypt('any_value')
    expect(hashed_value).toBe('hashed_value')
  })

  it('should throw if bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      throw new Error()
    })

    await expect(sut.encrypt('any_value')).rejects.toThrow()
  })
})
