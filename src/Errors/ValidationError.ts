import RequestError from './RequestError';
import { Error as MongooseError } from 'mongoose';

class ValidationError extends RequestError {
  constructor(error: MongooseError.ValidationError) {
    const errorMessages = Object.values(error.errors)
      .map((e) => e.message)
      .join('; ');

    super(`The following errors were found: ${errorMessages}`);
  }
}

export default ValidationError;
