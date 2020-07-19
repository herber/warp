import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class UnauthorizedException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'unauthorized') {
    super(code, HttpStatus.UNAUTHORIZED);
  }
}
