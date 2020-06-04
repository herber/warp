import { BaseParam } from './baseParam';
import { Request } from '../../interfaces/request';

export let User = () => {
  return BaseParam(req => (req as Request).user);
};
