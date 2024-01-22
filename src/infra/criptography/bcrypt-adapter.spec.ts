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
    const teste = await sut.encrypt('any_value')
    console.log('TESTE:', teste)
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
