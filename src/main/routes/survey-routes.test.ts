import request from 'supertest'
import { type Collection } from 'mongodb'

import { app } from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

// testar somente casos de sucesso
let surveyCollection: Collection

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
    await surveyCollection.deleteMany({})
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
  })
})
