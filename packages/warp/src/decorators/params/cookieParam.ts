import { Response, CookieOptions } from 'express';
import { HandlerParamSelector, BaseParam } from './baseParam';

export let Cookie = (cookieName?: string) => {
  const selector: HandlerParamSelector<any> = cookieName == null ? req => req.cookies : req => req.cookies[cookieName];
  return BaseParam(selector);
};

export let Cookies = Cookie;

export type CookieSetter = (name: string, val: any, options?: CookieOptions) => Response;

export let SetCookie = () => {
  return BaseParam<CookieSetter>((req, res) => res.cookie.bind(res));
};

export type CookieClearer = (name: string, options?: any) => Response;

export let ClearCookie = () => {
  return BaseParam<CookieClearer>((req, res) => res.clearCookie.bind(res));
};
