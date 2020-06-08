import { HttpException } from './httpException';
import { HttpStatus } from '../../const';

export class GoneException extends HttpException {
  constructor(public readonly message: string = 'Gone') {
    super(message, HttpStatus.GONE);
  }
}
