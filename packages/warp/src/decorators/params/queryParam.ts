import { HandlerParamSelector, BaseParam } from './baseParam';

export let Query = (paramName?: string) => {
  let selector: HandlerParamSelector<any> = paramName == null ? req => req.query : req => req.query[paramName];

  return BaseParam(selector);
};
