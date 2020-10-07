import IValidationError from './IValidationError';

interface IDomainModelValidator<T> {
  validate(model: T): Promise<boolean>;
  getErrors(): Array<IValidationError>;
}

export default IDomainModelValidator;
