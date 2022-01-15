import { Request } from 'express';
import { NotAcceptableException } from '../exceptions';

export interface GetAuthTokenOpts {
  header?: boolean | string;
  query?: boolean | string;
  headerScheme?: string;
  cookie?: string;
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
        throw new NotAcceptableException({
          message: `"${prefix}" is not a valid authentication scheme.`,
          code: 'invalid_scheme'
        });
      }

      return token;
    }
  }

  if (opts.query !== false) {
    let queryName = typeof opts.query == 'string' ? opts.query : 'access_token';
    let query = req.query ? req.query[queryName] : undefined;
    if (query) {
      return (Array.isArray(query) ? query[0] : query) as string;
    }
  }

  if (opts.cookie) {
    let cookie = req.cookies ? req.cookies[opts.cookie] : undefined;
    if (cookie) {
      return (Array.isArray(cookie) ? cookie[0] : cookie) as string;
    }
  }
};
