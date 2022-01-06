const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

module.exports = () => {
  const router = new SignUpRouter()
  router.post('/signup', new ExpressRouterAdapter().adapt(router))
}

class ExpressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

// Presentation
// signup-router
class SignUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SignUpUseCase().signup(email, password, repeatPassword)
    return {
      statusCode: 200,
      body: user
    }
  }
}

// Domain
// signup-usecase
class SignUpUseCase {
  async signup (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password)
    }
  }
}

// Infra
// add-acount-repo
class AddAccountRepository {
  async add (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}

// class SignUpRouter {
//   async route (req, res) {
//     const { email, password, repeatedPassword } = req.body
//     if (password === repeatedPassword) {
//       const user = await AccountModel.create({ email, password })
//       return res.json(user)
//     }
//     res.status(400).json({ error: 'password must be equal to repeatedPassword' })
//   }
// }
