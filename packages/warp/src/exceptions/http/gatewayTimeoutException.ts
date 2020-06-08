import { HttpException } from './httpException';
import { HttpStatus } from '../../const';

export class GatewayTimeoutException extends HttpException {
  constructor(public readonly message: string = 'Gateway Timeout') {
    super(message, HttpStatus.GATEWAY_TIMEOUT);
  }
}
