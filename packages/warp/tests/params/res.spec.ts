import request from 'supertest';
import warp, { Controller, Get, Response, Res } from '../../src';

describe('res param', () => {
  test('res param', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      authenticated(@Res() res: Response) {
        res.send('hello');
        return 'world';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('hello');
  });
});
