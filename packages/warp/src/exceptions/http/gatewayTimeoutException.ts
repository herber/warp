import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class GatewayTimeoutException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'gateway_timeout') {
    super(code, HttpStatus.GATEWAY_TIMEOUT);
  }
}
