import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class GatewayTimeoutException extends HttpException {
  constructor(public readonly message: string = 'Gateway Timeout') {
    super(message, HttpStatus.GATEWAY_TIMEOUT);
  }
}
