import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class NotFoundException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'not_found') {
    super(code, HttpStatus.NOT_FOUND);
  }
}
