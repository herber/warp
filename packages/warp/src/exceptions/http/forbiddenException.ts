import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class ForbiddenException extends HttpException {
  constructor(public readonly message: string = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
