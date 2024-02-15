import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldsValidation } from './required-fields-validation'

const makeSut = (): RequiredFieldsValidation => {
  return new RequiredFieldsValidation('field')
}

describe('RequiredField Validation', () => {
  it('should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'field' })
    expect(error).toBeNull()
  })
})
