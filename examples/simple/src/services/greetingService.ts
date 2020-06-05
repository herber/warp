import { Service } from '@varld/warp';

@Service()
export class GreetingService {
  sayHello(name: string) {
    return `Hello ${name}`;
  }

  sayHowdy(name: string) {
    return `Howdy ${name}`;
  }
}