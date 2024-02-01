import { type Authentication, type AuthenticationModel } from '../../../domain/usecases/authentication'
import { type HashCompare } from '../../protocols/criptography/hash-compare'
import { type LoadAccountByEmailRepository } from '../../protocols/db/log-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository, private readonly hashCompare: HashCompare) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashCompare.compare(authentication.password, account.password)
      return await Promise.resolve('')
    }
    return null
  }
}
