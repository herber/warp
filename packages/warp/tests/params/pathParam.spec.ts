import request from 'supertest';
import warp, { Controller, Get, Param, Params } from '../../src';

describe('path param', () => {
  test('all path params', async () => {
    @Controller('/')
    class IndexController {
      @Get('/:id')
      handler(@Params() param: any) {
        return param;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/abc');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual(
      JSON.stringify({
        id: 'abc'
      })
    );
  });

  test('single cookie param', async () => {
    @Controller('/')
    class IndexController {
      @Get('/:id')
      handler(@Param('id') id: any) {
        return id;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/abc');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('abc');
  });
});
