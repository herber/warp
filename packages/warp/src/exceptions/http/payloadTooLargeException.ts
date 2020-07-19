import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class PayloadTooLargeException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'payload_too_large') {
    super(code, HttpStatus.PAYLOAD_TOO_LARGE);
  }
}
