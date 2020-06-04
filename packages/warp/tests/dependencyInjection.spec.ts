import request from 'supertest';
import warp, { Controller, Get, Service, Param } from '../src';

describe('dependency injection', () => {
  test('guards protect handlers', async () => {
    @Service()
    class GreetingService {
      greet(name: string) {
        return `Hello ${name}`;
      }
    }

    @Controller('/')
    class IndexController {
      constructor(private greetingService: GreetingService) {}

      @Get('/:name')
      nope(@Param('name') name: string) {
        return this.greetingService.greet(name);
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/someone');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello someone');
  });
});
