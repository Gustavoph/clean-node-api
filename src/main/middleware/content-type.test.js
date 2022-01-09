const request = require('supertest')
const { app } = require('../config/app');

describe('Content-Type middleware', () => {
  beforeAll(() => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
  })

  test('Shoul return json content type as default', async () => {
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Shoul return json content type as default', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})