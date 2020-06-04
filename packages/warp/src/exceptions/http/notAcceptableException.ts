import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class NotAcceptableException extends HttpException {
  constructor(public readonly message: string = 'Not Acceptable') {
    super(message, HttpStatus.NOT_ACCEPTABLE);
  }
}
