import { InternalWarpOpts } from './internalWarpOpts';
import { Request } from './request';

export interface WarpContext {
  authToken?: string;
  authenticator?: (token: string, req: Request) => any;
  options: InternalWarpOpts;
}
