import request from 'supertest';
import warp, { Controller, Get, Post, Put, Patch, Delete, Options, Head, All } from '../src';

describe('methods', () => {
  test('http get method', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      handler() {
        return 'hello';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('hello');
  });

  test('http post method', async () => {
    @Controller('/')
    class IndexController {
      @Post('/')
      handler() {
        return 'hello';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).post('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('hello');
  });

  test('http put method', async () => {
    @Controller('/')
    class IndexController {
      @Put('/')
      handler() {
        return 'hello';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).put('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('hello');
  });

  test('http patch method', async () => {
    @Controller('/')
    class IndexController {
      @Patch('/')
      handler() {
        return 'hello';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).patch('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('hello');
  });

  test('http delete method', async () => {
    @Controller('/')
    class IndexController {
      @Delete('/')
      handler() {
        return 'hello';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).delete('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('hello');
  });

  test('http options method', async () => {
    @Controller('/')
    class IndexController {
      @Options('/')
      handler() {
        return 'hello';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).options('/');

    expect(response.status).toEqual(204);
  });

  test('http head method', async () => {
    @Controller('/')
    class IndexController {
      @Head('/')
      handler() {
        return 'hello';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).head('/');

    expect(response.status).toEqual(200);
  });

  test('all http methods', async () => {
    @Controller('/')
    class IndexController {
      @All('/')
      handler() {
        return 'hello';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response1 = await request(app).get('/');
    let response2 = await request(app).post('/');
    let response3 = await request(app).put('/');
    let response4 = await request(app).patch('/');
    let response5 = await request(app).delete('/');
    let response6 = await request(app).options('/');
    let response7 = await request(app).head('/');

    expect(response1.status).toEqual(200);
    expect(response1.text).toEqual('hello');

    expect(response2.status).toEqual(200);
    expect(response2.text).toEqual('hello');

    expect(response3.status).toEqual(200);
    expect(response3.text).toEqual('hello');

    expect(response4.status).toEqual(200);
    expect(response4.text).toEqual('hello');

    expect(response5.status).toEqual(200);
    expect(response5.text).toEqual('hello');

    expect(response6.status).toEqual(204);
    expect(response7.status).toEqual(200);
  });
});
