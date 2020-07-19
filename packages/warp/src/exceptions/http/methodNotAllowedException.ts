import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class MethodNotAllowedException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'method_not_allowed') {
    super(code, HttpStatus.METHOD_NOT_ALLOWED);
  }
}
