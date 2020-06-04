import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
  constructor(
    public readonly message: string = 'Invalid Request Data',
    public readonly validationErrors: ValidationError[]
  ) {
    super(message, HttpStatus.NOT_ACCEPTABLE);
  }
}
