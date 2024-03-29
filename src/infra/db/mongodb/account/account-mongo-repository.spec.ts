import { type Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('.add', () => {
    it('should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })

      expect(account).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('.loadByEmail', () => {
    it('should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    it('should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('.updateAccessToken', () => {
    it('should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const accountInserted = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      await sut.updateAccessToken(String(accountInserted.insertedId), 'any_token')
      const account = await accountCollection.findOne({ _id: accountInserted.insertedId })
      expect(account).toBeTruthy()
      expect(account!.accessToken).toBeTruthy()
      expect(account!.name).toBe('any_name')
      expect(account!.email).toBe('any_email@mail.com')
      expect(account!.password).toBe('any_password')
    })
  })

  describe('.loadByToken', () => {
    it('should return an account on loadByToken success without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account!.id).toBeTruthy()
      expect(account!.name).toBe('any_name')
      expect(account!.email).toBe('any_email@mail.com')
      expect(account!.password).toBe('any_password')
    })

    it('should return an account on loadByToken success with role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account!.id).toBeTruthy()
      expect(account!.name).toBe('any_name')
      expect(account!.email).toBe('any_email@mail.com')
      expect(account!.password).toBe('any_password')
    })

    it('should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token', 'any_role')
      expect(account).toBeFalsy()
    })
  })
})
