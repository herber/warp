import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class PayloadTooLargeException extends HttpException {
  constructor(public readonly message: string = 'Payload Too Large') {
    super(message, HttpStatus.PAYLOAD_TOO_LARGE);
  }
}
