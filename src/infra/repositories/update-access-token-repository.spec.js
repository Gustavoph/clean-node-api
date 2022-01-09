const { MissingParamError } = require('../../utils/errors')
const { MongoHelper } = require('../helpers')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
let userModel

const makeSut = () => {
  return new UpdateAccessTokenRepository()
}

const validEmail = 'valid_email@email.com'

describe('UpdateAccessToken Repository', () => {
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

  test('Should update the user with the given accessToken', async () => {
    const sut = makeSut()
    await userModel.insertOne({
      email: validEmail,
      name: 'any_name',
      age: 19,
      state: 'any_state',
      password: 'hashed_password'
    })

    const fakeUser = await userModel.findOne({ email: validEmail })
    await sut.update(fakeUser._id, 'valid_token')

    const updatedFakeUser = await userModel.findOne({ email: validEmail })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update('any_id')).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
