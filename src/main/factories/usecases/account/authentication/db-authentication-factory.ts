import { DbAuthentication } from '../../../../../data/usecases/authentication/db-authentication'
import { type Authentication } from '../../../../../domain/usecases/authentication'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adater/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(Number(env.salt))
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
