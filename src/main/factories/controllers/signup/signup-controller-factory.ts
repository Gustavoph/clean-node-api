import { SignUpController } from '../../../../presentation/controllers/login/signup/signup-controller'
import { type Controller } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(new SignUpController(makeAddAccount(), makeSignUpValidation(), makeDbAuthentication()))
}
