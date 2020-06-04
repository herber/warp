import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class UnauthorizedException extends HttpException {
  constructor(public readonly message: string = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
