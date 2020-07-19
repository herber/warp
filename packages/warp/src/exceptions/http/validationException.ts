import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
  constructor(
    public readonly message: string = 'invalid_request_data',
    public readonly validationErrors: ValidationError[]
  ) {
    super(
      {
        code: message,
        validationErrors
      },
      HttpStatus.NOT_ACCEPTABLE
    );
  }
}
