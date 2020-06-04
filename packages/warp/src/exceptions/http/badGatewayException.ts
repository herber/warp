import { HttpException } from './httpException';
import { HttpStatus } from '../../const';

export class BadGatewayException extends HttpException {
  constructor(public readonly message: string = 'Bad Gateway') {
    super(message, HttpStatus.BAD_GATEWAY);
  }
}
