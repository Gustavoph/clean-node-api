import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'
import { type Validation } from '../../../../../presentation/protocols'
import { CompareFieldsValidation, EmailValidation, RequiredFieldsValidation, ValidationComposite } from '../../../../../validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', emailValidatorAdapter))
  return new ValidationComposite(validations)
}
