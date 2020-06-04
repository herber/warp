import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class UnprocessableEntityException extends HttpException {
  constructor(public readonly message: string = 'Unprocessable Entity') {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
