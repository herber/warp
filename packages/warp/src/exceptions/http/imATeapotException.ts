import { HttpException } from './httpException';
import { HttpStatus } from '../../const';

export class ImATeapotException extends HttpException {
  constructor(public readonly message: string = 'I am a Teapot') {
    super(message, HttpStatus.I_AM_A_TEAPOT);
  }
}
