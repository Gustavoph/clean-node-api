import { type AccountModel, type AddAccount, type AddAccountModel, type AddAccountRepository, type Encrypter } from './db-add-account.protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashed_password = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashed_password }))
    return await Promise.resolve(null)
  }
}
