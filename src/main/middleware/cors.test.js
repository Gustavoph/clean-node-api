const request = require('supertest')
const { app } = require('../config/app');

describe('CORS middleware', () => {
  beforeAll(() => {
    app.get('/test_x_powered_by', (req, res) => {
      res.send('')
    })
  })

  test('Shoul enable CORS', async () => {
    const response = await request(app)
      .get('/test_x_powered_by')
    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
  })
})