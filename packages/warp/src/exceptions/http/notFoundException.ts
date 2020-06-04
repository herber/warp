import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class NotFoundException extends HttpException {
  constructor(public readonly message: string = 'Not Found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
