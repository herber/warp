import { ValidatorOptions } from 'class-validator';
import { GetAuthTokenOpts } from '../utils/getAuthToken';

export interface AuthenticationOpts extends GetAuthTokenOpts {
  global?: boolean;
}

export interface InternalWarpOpts {
  validation?: boolean | ValidatorOptions;
  authentication?: AuthenticationOpts;
}
