import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator-adapter'
import { type Validation } from '../../../../presentation/protocols'
import { EmailValidation, RequiredFieldsValidation, ValidationComposite } from '../../../../validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new EmailValidation('email', emailValidatorAdapter))
  return new ValidationComposite(validations)
}
