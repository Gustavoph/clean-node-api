import request from 'supertest'
import { type Collection } from 'mongodb'

import { app } from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

// testar somente casos de sucesso
let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    it('should return an 403 on add survey without accessToken', async () => {
      await request(app).post('/api/surveys')
        .send({
          question: 'any_question',
          answers: [
            { answer: 'any_answer', image: 'http://image-name.com' },
            { answer: 'other_answer' }
          ]
        }).expect(403)
    })

    it('should return an 204 with valid accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'Gustavo Oliveira',
        email: 'gustavo@gmail.com',
        password: '123',
        role: 'admin'
      })
      const accessToken = sign({ id: result.insertedId }, env.jwtSecret)
      await accountCollection.updateOne({ _id: result.insertedId }, { $set: { accessToken } })

      await request(app).post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [
            { answer: 'any_answer', image: 'http://image-name.com' },
            { answer: 'other_answer' }
          ]
        }).expect(204)
    })
  })
})
