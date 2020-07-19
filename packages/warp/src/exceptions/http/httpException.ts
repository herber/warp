import { HttpStatus } from '../../const';
import { ErrorResponse } from '../../interfaces/errorResponse';

export class HttpException extends Error {
  constructor(
    public readonly data: string | ErrorResponse,
    public readonly status: number = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    super(typeof data == 'string' ? data : data.code);
  }
}
