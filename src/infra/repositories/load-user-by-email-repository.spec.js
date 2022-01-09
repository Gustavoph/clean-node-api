const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const { MissingParamError } = require('../../utils/errors')
const { MongoHelper } = require('../helpers')
let userModel

const validEmail = 'valid_email@email.com'
const invalidEmail = 'invalid_email@email.com'

const makeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load(invalidEmail)
    expect(user).toBeNull()
  })

  test('Should return user if user is found', async () => {
    const sut = makeSut()
    await userModel.insertOne({
      email: validEmail,
      name: 'any_name',
      age: 19,
      state: 'any_state',
      password: 'hashed_password'
    })
    const user = await sut.load(validEmail)
    expect(user.email).toBe(validEmail)
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
