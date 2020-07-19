import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class ConflictException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'conflict') {
    super(code, HttpStatus.CONFLICT);
  }
}
