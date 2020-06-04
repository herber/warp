import request from 'supertest';
import warp, { Controller, Get, Cookies, Cookie, SetCookie, ClearCookie } from '../../src';

describe('cookie param', () => {
  test('all cookie params', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      handler(@Cookies() cookies: any) {
        return cookies;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/').set('Cookie', ['hello=world']);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual(
      JSON.stringify({
        hello: 'world'
      })
    );
  });

  test('single cookie param', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      handler(@Cookie('hello') cookies: any) {
        return cookies;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/').set('Cookie', ['hello=world']);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('world');
  });

  test('set cookie param', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      handler(@SetCookie() setCookie: any) {
        setCookie('a', 'b');
        return 'hello';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');
    expect(response.get('Set-Cookie')).toEqual(['a=b; Path=/']);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('hello');
  });

  test('clear cookie param', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      handler(@ClearCookie() clearCookie: any) {
        clearCookie('a');
        return 'hello';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');
    expect(response.get('Set-Cookie')[0]).toMatch(/Expires=/);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('hello');
  });
});
