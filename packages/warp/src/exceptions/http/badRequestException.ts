import { HttpException } from './httpException';
import { HttpStatus } from '../../const';

export class BadRequestException extends HttpException {
  constructor(public readonly message: string = 'Bad Request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
