import request from 'supertest';
import warp, { Controller, Get, Authenticated, User } from '../../src';

describe('user param', () => {
  test('user param in handler', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Authenticated()
      authenticated(@User() user: string) {
        return user;
      }
    }

    let app = warp({
      controllers: [IndexController],
      authenticator: (token, req) => {
        return 'authenticated';
      }
    });

    let response = await request(app).get('/').set('Authorization', 'bearer 1234');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('authenticated');
  });
});
