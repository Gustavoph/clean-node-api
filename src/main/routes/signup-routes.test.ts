import request from 'supertest'

import { app } from '../config/app'

// testar somente casos de sucesso

describe('SignUp Routes', () => {
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
