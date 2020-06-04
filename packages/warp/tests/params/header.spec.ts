import request from 'supertest';
import warp, { Controller, Get, Header, Headers } from '../../src';

describe('header param', () => {
  test('all header params', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      handler(@Headers() header: any) {
        return header.hello;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/').set('hello', 'world');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('world');
  });

  test('single header param', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      handler(@Header('hello') hello: any) {
        return hello;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/').set('hello', 'world');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('world');
  });
});
