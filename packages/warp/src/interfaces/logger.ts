import { HttpException } from '../exceptions';

export type Logger = (error: HttpException | Error) => any;
