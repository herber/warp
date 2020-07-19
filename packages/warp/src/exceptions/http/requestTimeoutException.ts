import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class RequestTimeoutException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'request_timeout') {
    super(code, HttpStatus.REQUEST_TIMEOUT);
  }
}
