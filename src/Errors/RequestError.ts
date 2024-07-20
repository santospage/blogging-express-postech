import BaseError from './BaseError';

class RequestError extends BaseError {
  constructor(message = 'Data provided is incorrect') {
    super(message, 400);
  }
}

export default RequestError;
