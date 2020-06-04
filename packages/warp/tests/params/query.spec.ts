import request from 'supertest';
import warp, { Controller, Get, Query } from '../../src';

describe('query param', () => {
  test('all query params', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      handler(@Query() query: any) {
        return query;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/?hello=world');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual(
      JSON.stringify({
        hello: 'world'
      })
    );
  });

  test('single query param', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      handler(@Query('hello') hello: any) {
        return hello;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/?hello=world');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('world');
  });
});
