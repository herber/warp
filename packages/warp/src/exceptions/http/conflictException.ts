import { HttpException } from './httpException';
import { HttpStatus } from '../../const';

export class ConflictException extends HttpException {
  constructor(public readonly message: string = 'Conflict') {
    super(message, HttpStatus.CONFLICT);
  }
}
