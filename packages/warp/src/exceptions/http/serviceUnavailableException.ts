import { HttpException } from './httpException';
import { HttpStatus } from '../../const';

export class ServiceUnavailableException extends HttpException {
  constructor(public readonly message: string = 'Service Unavailable') {
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
