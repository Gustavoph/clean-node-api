const bcrypt = require('bcrypt')
const { Encrypter } = require('./encrypter')
const { MissingParamError } = require('../errors')

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt returns false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt if correct values', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    await sut.compare('any_password', 'hashed_password')
    expect(bcrypt.password).toBe('any_password')
    expect(bcrypt.hashedPassword).toBe('hashed_password')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.compare()).rejects.toThrow(new MissingParamError('password'))
    expect(sut.compare('password')).rejects.toThrow(new MissingParamError('hashedPassword'))
  })
})
