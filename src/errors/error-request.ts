import ErrorBase from './error-base';

class ErrorRequest extends ErrorBase {
  constructor(message = 'Data provided is incorrect') {
    super(message, 400);
  }
}

export default ErrorRequest;
