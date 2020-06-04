import { HttpStatus } from '../../const';

export class HttpException extends Error {
  constructor(public readonly message: string, public readonly status: number = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message);
  }
}
