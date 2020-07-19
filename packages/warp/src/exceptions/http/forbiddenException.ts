import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class ForbiddenException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'forbidden') {
    super(code, HttpStatus.FORBIDDEN);
  }
}
