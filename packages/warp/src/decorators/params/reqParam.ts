import { BaseParam } from './baseParam';
import { Request } from '../../interfaces/request';

export let Req = () => {
  return BaseParam(req => req as Request);
};
