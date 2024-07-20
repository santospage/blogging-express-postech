import BaseError from './BaseError';

class NotFound extends BaseError {
  constructor(message = 'Page not found') {
    super(message, 404);
  }
}

export default NotFound;
