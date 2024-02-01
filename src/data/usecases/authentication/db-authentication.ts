import { type Authentication, type AuthenticationModel } from '../../../domain/usecases/authentication'
import { type LoadAccountByEmailRepository } from '../../protocols/log-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return await Promise.resolve('')
  }
}
