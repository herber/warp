import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class NotAcceptableException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'not_acceptable') {
    super(code, HttpStatus.NOT_ACCEPTABLE);
  }
}
