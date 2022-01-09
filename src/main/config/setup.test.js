const request = require('supertest')
const { app } = require('./app');

describe('App Setup', () => {
  beforeAll(() => {
    app.get('/test_x_powered_by', (req, res) => {
      res.send('')
    })
  })
  test('Shoul disable x-powered-by header', async () => {
    const response = await request(app)
      .get('/test_x_powered_by')
    expect(response.headers['x-powered-by']).toBeUndefined()
  })
})