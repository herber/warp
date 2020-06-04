import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class ConflictException extends HttpException {
  constructor(public readonly message: string = 'Conflict') {
    super(message, HttpStatus.CONFLICT);
  }
}
