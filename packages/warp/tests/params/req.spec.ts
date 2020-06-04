import request from 'supertest';
import warp, { Controller, Get, Req, Request } from '../../src';

describe('req param', () => {
  test('req param', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      authenticated(@Req() req: Request) {
        return req.path;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('/');
  });
});
