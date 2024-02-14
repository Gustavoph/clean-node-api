import { type LoadAccountByEmailRepository, type AccountModel, type AddAccount, type AddAccountModel, type AddAccountRepository, type Hasher } from './db-add-account.protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository, private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashed_password = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashed_password }))
      return newAccount
    }
    return null
  }
}
