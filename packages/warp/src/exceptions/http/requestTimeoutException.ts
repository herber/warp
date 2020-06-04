import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class RequestTimeoutException extends HttpException {
  constructor(public readonly message: string = 'Request Timeout') {
    super(message, HttpStatus.REQUEST_TIMEOUT);
  }
}
