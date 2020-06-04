import { HandlerParamSelector, BaseParam } from './baseParam';

export let Params = (paramName?: string) => {
  let selector: HandlerParamSelector<any> = paramName == null ? req => req.params : req => req.params[paramName];

  return BaseParam(selector);
};

export let Param = Params;
