import { HttpException } from './httpException';
import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class UnsupportedMediaTypeException extends HttpException {
  constructor(public readonly code: string | ErrorResponse = 'unsupported_media_type') {
    super(code, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
