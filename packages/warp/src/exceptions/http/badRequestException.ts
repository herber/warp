import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class BadRequestException extends HttpException {
  constructor(public readonly message: string = 'Bad Request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
