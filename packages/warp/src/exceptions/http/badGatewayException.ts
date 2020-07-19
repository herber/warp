import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces';

export class BadGatewayException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'bad_gateway') {
    super(code, HttpStatus.BAD_GATEWAY);
  }
}
