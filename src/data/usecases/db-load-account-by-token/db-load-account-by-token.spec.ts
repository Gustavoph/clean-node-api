import { DbLoadAccountByToken } from './db-load-account-by-token'
import { type Decrypter } from '../../protocols/criptography/decrypter'

interface SutTypes {
  sut: DbLoadAccountByToken
  descrypterStub: Decrypter
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('any_value')
    }
  }

  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const descrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(descrypterStub)
  return { sut, descrypterStub }
}

describe('DbLoadAccountByToken', () => {
  it('should call Decrypter with correct values', async () => {
    const { sut, descrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(descrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
