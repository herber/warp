import { HttpException } from './httpException';
import { HttpStatus } from '../../const';

export class NotImplementedException extends HttpException {
  constructor(public readonly message: string = 'Not Implemented') {
    super(message, HttpStatus.NOT_IMPLEMENTED);
  }
}
