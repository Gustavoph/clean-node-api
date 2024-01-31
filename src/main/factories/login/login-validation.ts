import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { RequiredFieldsValidation } from '../../../presentation/helpers/validators/required-fields-validation'
import { type Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new EmailValidation('email', emailValidatorAdapter))
  return new ValidationComposite(validations)
}
