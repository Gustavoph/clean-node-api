const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const { MissingParamError } = require('../../utils/errors')
const { MongoHelper } = require('../helpers')
let db

const validEmail = 'valid_email@email.com'
const invalidEmail = 'invalid_email@email.com'

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    userModel, sut
  }
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load(invalidEmail)
    expect(user).toBeNull()
  })

  test('Should return user if user is found', async () => {
    const { sut, userModel } = makeSut()
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

  test('Should throw if no userModal is provided', async () => {
    const sut = new LoadUserByEmailRepository()
    const promise = sut.load(validEmail)
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
