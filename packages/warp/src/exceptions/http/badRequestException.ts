import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class BadRequestException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'bad_request') {
    super(code, HttpStatus.BAD_REQUEST);
  }
}
