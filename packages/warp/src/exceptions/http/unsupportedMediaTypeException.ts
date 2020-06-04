import { HttpException } from './HttpException';
import { HttpStatus } from '../../const';

export class UnsupportedMediaTypeException extends HttpException {
  constructor(public readonly message: string = 'Unsupported Media Type') {
    super(message, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
