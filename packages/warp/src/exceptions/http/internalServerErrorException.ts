import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class InternalServerErrorException extends HttpException {
  constructor(public readonly message: string = 'Internal Server Error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
