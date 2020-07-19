import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class UnprocessableEntityException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'unprocessable_entity') {
    super(code, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
