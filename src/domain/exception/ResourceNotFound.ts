import HttpThrowableException from "./HttpThrowableException";

class ResourceNotFound extends HttpThrowableException {

  constructor(id: string) {
    super(
      `Resource ${id} not found`,
      'ResourceNotFound'
    );
  }

  response(): any {
    return {
      message: this.message
    };
  }

  get httpCode(): number {
    return 404;
  }
}

export default ResourceNotFound;
