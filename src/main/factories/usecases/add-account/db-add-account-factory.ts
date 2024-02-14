import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { type AddAccount } from '../../../../domain/usecases/add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adater/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../config/env'

export const makeAddAccount = (): AddAccount => {
  const accountMongoRepository = new AccountMongoRepository()
  const hasherAdapter = new BcryptAdapter(Number(env.salt))
  return new DbAddAccount(hasherAdapter, accountMongoRepository, accountMongoRepository)
}
