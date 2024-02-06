import request from 'supertest'
import { hash } from 'bcrypt'
import { type Collection } from 'mongodb'

import { app } from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

// testar somente casos de sucesso
let accountCollection: Collection

describe('Login Routes', () => {
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

  describe('POST /signup', () => {
    it('should return an 200 on signup', async () => {
      await request(app).post('/api/signup')
        .send({
          name: 'Gustavo Oliveira',
          email: 'gustavo@gmail.com',
          password: '123456Ab',
          passwordConfirmation: '123456Ab'
        }).expect(200)
    })
  })

  describe('POST /login', () => {
    it('should return an 200 on login', async () => {
      const password = await hash('123456Ab', 12)

      await accountCollection.insertOne({
        name: 'Gustavo Oliveira',
        email: 'gustavo@gmail.com',
        password,
        passwordConfirmation: '123456Ab'
      })

      await request(app).post('/api/login')
        .send({
          email: 'gustavo@gmail.com',
          password: '123456Ab'
        }).expect(200)
    })
  })
})
