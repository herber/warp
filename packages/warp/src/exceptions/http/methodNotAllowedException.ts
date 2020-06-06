import { HttpException } from './httpException';
import { HttpStatus } from '../../const';

export class MethodNotAllowedException extends HttpException {
  constructor(public readonly message: string = 'Method Not Allowed') {
    super(message, HttpStatus.METHOD_NOT_ALLOWED);
  }
}
