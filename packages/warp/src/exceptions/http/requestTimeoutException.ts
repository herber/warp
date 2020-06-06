import { HttpException } from './httpException';
import { HttpStatus } from '../../const';

export class RequestTimeoutException extends HttpException {
  constructor(public readonly message: string = 'Request Timeout') {
    super(message, HttpStatus.REQUEST_TIMEOUT);
  }
}
