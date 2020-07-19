import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class InternalServerErrorException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'internal_server_error') {
    super(code, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
