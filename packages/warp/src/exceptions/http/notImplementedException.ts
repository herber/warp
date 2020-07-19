import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class NotImplementedException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'not_implemented') {
    super(code, HttpStatus.NOT_IMPLEMENTED);
  }
}
