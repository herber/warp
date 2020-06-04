import request from 'supertest';
import warp, { Controller, Get, BaseParam } from '../../src';

describe('base param', () => {
  test('base param', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      authenticated(@BaseParam((req, res) => ({ req, res })) custom: any) {
        custom.res.send(custom.req.path);
        return 'world';
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
