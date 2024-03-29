import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { type Middleware } from '../../../presentation/protocols'
import { makeDbLoadAccountByTokenFactory } from '../usecases/account/load-account-by-token/db-load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByTokenFactory(), role)
}
