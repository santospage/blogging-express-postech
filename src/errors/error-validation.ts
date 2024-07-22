import { Error as MongooseError } from 'mongoose';

import ErrorRequest from './error-request';

class ErrorValidation extends ErrorRequest {
  constructor(error: MongooseError.ValidationError) {
    const errorMessages = Object.values(error.errors)
      .map((e) => e.message)
      .join('; ');

    super(`The following errors were found: ${errorMessages}`);
  }
}

export default ErrorValidation;
