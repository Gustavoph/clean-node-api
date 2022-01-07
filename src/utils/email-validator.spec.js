const validator = require('validator')
const EmailValidator = require('./email-validator')
const { MissingParamError } = require('./errors')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@email.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator returns false', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email')
    expect(isEmailValid).toBe(false)
  })

  test('Should call validatorEmail with correct email', () => {
    const sut = makeSut()
    sut.isValid('valid_email')
    expect(validator.email).toBe('valid_email')
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    expect(() => { sut.isValid() }).toThrow(new MissingParamError('email'))
  })
})
