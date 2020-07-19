import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class ServiceUnavailableException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'service_unavailable') {
    super(code, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
