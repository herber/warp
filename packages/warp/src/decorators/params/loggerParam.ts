import { HandlerParamSelector, BaseParam } from './baseParam';
import winston from 'winston';

export let Logger = () => {
  let selector: HandlerParamSelector<winston.Logger> = req => req.logger;
  return BaseParam(selector);
};
