import { Request } from 'express';
import { NotAcceptableException } from '../exceptions';

export interface GetAuthTokenOpts {
  header?: boolean | string;
  query?: boolean | string;
  headerScheme?: string;
}

export let getAuthToken = (opts: GetAuthTokenOpts = {}) => (req: Request): string | undefined => {
  if (opts.header !== false) {
    let headerName = (opts.header !== true ? opts.header : undefined) || 'Authorization';
    let header = req.headers ? req.headers[headerName.toLowerCase()] : undefined;
    let headerScheme = (opts.headerScheme || 'bearer').toLowerCase();

    if (header) {
      header = Array.isArray(header) ? header[0] : header;

      let parts = header.split(' ');
      let prefix = parts[0];
      let token = parts.slice(1).join(' ');

      if (prefix.toLowerCase() != headerScheme) {
        throw new NotAcceptableException(`"${prefix}" is not a valid authentication scheme.`);
      }

      return token;
    }
  }

  if (opts.query !== false) {
    let queryName = (opts.query !== true ? opts.query : undefined) || 'access_token';
    let query = req.query ? req.query[queryName] : undefined;

    return (Array.isArray(query) ? query[0] : query) as string;
  }
};
