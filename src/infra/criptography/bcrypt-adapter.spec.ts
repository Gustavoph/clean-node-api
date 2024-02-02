import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

/*
 - jest.mock mocka a implementação inteira, todos os teste utiliza
 essa implementação mockada

 - já o jest.spyOn irá mockar naquele teste em específico, fora que o jest.spyOn
 espionara o método e assim é possível ver quantas vezes o metodo foi chamado
 e com o que ele foi chamado
*/

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hashed_value')
  },

  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('should call hash with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    expect(hashSpy).toHaveBeenCalledTimes(1)
  })

  it('should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hashed_value = await sut.hash('any_value')
    expect(hashed_value).toBe('hashed_value')
  })

  it('should throw if bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      throw new Error()
    })

    await expect(sut.hash('any_value')).rejects.toThrow()
  })

  it('should call compare with correct value', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledTimes(1)
  })

  it('should return a true if compare succeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBeTruthy()
  })

  it('should return a false if compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => await Promise.resolve(false))
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBeFalsy()
  })
})
