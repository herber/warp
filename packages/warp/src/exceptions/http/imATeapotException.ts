import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class ImATeapotException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'i_am_a_teapot') {
    super(code, HttpStatus.I_AM_A_TEAPOT);
  }
}
