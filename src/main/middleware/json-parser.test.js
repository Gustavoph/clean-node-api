const request = require('supertest')
const { app } = require('../config/app');

describe('JSON Parser middleware', () => {
  beforeAll(() => {
    app.post('/test_json_parser', (req, res) => {
      res.send(req.body)
    })
  })

  test('Shoul parse body as JSON', async () => {
    const response = await request(app)
      .post('/test_json_parser')
      .send({ name: 'Gustavo' })

    expect(response.body).toEqual({ name: 'Gustavo' })
  })
})