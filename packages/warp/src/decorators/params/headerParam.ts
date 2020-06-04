import { HandlerParamSelector, BaseParam } from './baseParam';

export let Headers = (headerName?: string) => {
  let selector: HandlerParamSelector<any> = headerName == null ? req => req.headers : req => req.headers[headerName];

  return BaseParam(selector);
};

export let Header = Headers;
