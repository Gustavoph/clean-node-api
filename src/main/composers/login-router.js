const LoginRouter = require('../../presentation/routers/login-router')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const EmailValidator = require('../../utils/email-validator')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const Encrypter = require('../../utils/helpers/encrypter')
const TokenGenerator = require('../../utils/helpers/token-generator')
const env = require('../config/env')

const encrypter = new Encrypter()
const tokenGenerator = new TokenGenerator(env.tokenSecret)
const loadUserByEmailRepository = new LoadUserByEmailRepository()
const updateAccessTokenRepository = new UpdateAccessTokenRepository()
const authUseCase = new AuthUseCase({
  loadUserByEmailRepository,
  updateAccessTokenRepository,
  encrypter,
  tokenGenerator
})
const emailValidator = new EmailValidator()
const loginRouter = new LoginRouter({ authUseCase, emailValidator })

module.exports = { loginRouter }
