import IValidationError from "../../application/validator/IValidationError";
import HttpThrowableException from "./HttpThrowableException";

class ValidationException extends HttpThrowableException {

  public errors: Array<IValidationError>;

  constructor(errors: Array<IValidationError>) {
    super(
      'Some validation errors occurred',
      'ValidationException',
    );

    this.errors = errors;
  }

  response(): any {
    return {
      message: this.message,
      errors: this.errors
    }
  }

  get httpCode(): number {
    return 400;
  }
}

export default ValidationException;
