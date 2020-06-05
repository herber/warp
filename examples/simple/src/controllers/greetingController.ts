import { Controller, Get, Param } from '@varld/warp';
import { GreetingService } from '../services/greetingService';

@Controller('/')
export class GreetingController {
  constructor(
    private greetingService: GreetingService
  ) {}

  @Get('/')
  greetUnknown() {
    return this.greetingService.sayHello('unknown');
  }

  @Get('/:name')
  greetByName(@Param('name') name: string) {
    return this.greetingService.sayHello(name);
  }

  @Get('/cowboy/:name')
  greetCowboy(@Param('name') name: string) {
    return this.greetingService.sayHowdy(name);
  }
}