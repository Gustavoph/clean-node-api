import request from 'supertest'

import { app } from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

// testar somente casos de sucesso

describe('SignUp Routes', () => {
  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('should return an account on success', async () => {
    await request(app).post('/api/signup')
      .send({
        name: 'Gustavo Oliveira',
        email: 'gustavo@gmail.com',
        password: '123456Ab',
        passwordConfirmation: '123456Ab'
      })
      .expect(200)
  })
})
