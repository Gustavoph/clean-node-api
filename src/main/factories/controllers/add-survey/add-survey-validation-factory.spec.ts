import { type Validation } from '../../../../presentation/protocols/validation'
import { RequiredFieldsValidation, ValidationComposite } from '../../../../validation/validators'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
