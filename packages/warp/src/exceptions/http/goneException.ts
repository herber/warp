import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class GoneException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'gone') {
    super(code, HttpStatus.GONE);
  }
}
