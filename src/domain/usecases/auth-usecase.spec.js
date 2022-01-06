const { AuthUseCase } = require('./auth-usecase')
const { MissingParamError } = require('../../utils/errors')

const makeEncrypterSpy = () => {
  class EncrypterSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword

      return this.isValid
    }
  }
  return new EncrypterSpy()
}

const makeTokenGeneratorSpy = () => {
  class TokenGeneratorSpy {
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy()
  return tokenGeneratorSpy
}

const makeUpdateAccessTokenRepositorySpy = () => {
  class UpdateAccessTokenRepositorySpy {
    async update (userId, accessToken) {
      this.userId = userId
      this.accessToken = accessToken
    }
  }

  return new UpdateAccessTokenRepositorySpy()
}

const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }

  return new LoadUserByEmailRepositorySpy()
}

const makeSut = () => {
  const encrypterSpy = makeEncrypterSpy()
  encrypterSpy.isValid = true

  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    id: 'any_id',
    password: 'hashed_password'
  }

  const tokenGeneratorSpy = makeTokenGeneratorSpy()
  tokenGeneratorSpy.accessToken = 'any_token'

  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepositorySpy()

  const sut = new AuthUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    encrypter: encrypterSpy,
    tokenGenerator: tokenGeneratorSpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy
  })
  return {
    sut,
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGeneratorSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_email@email.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmail Repository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any_email@email.com', 'any_password')
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadUserByEmailRepository return null', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_email@email.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid email is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_email@email.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provided', async () => {
    const { sut, encrypterSpy } = makeSut()
    encrypterSpy.isValid = false
    const accessToken = await sut.auth('valid_email@email.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth('valid_email@email.com', 'any_password')
    expect(encrypterSpy.password).toBe('any_password')
    expect(encrypterSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })

  test('Should call TokenGenerator with correct userId', async () => {
    const { sut, tokenGeneratorSpy, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('valid_email@email.com', 'any_password')
    expect(tokenGeneratorSpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, updateAccessTokenRepositorySpy, tokenGeneratorSpy } = makeSut()
    await sut.auth('valid_email@email.com', 'any_password')
    expect(updateAccessTokenRepositorySpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
    expect(updateAccessTokenRepositorySpy.accessToken).toBe(tokenGeneratorSpy.accessToken)
  })

  test('Should return an accessToken if credentials are provided', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    const accessToken = await sut.auth('valid_email@email.com', 'any_password')
    expect(accessToken).toBe(tokenGeneratorSpy.accessToken)
    expect(accessToken).toBeTruthy()
  })
})
