import request from 'supertest';
import express from 'express';
import warp, { Controller, Get, Post, Body, UnauthorizedException } from '../src';

describe('warp', () => {
  test('serves basic api', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      sendHello() {
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

  test('accepts existing express app', async () => {
    let expressApp = express();
    expressApp.get('/', (req, res) => res.send('hello from express'));

    let app = warp({
      express: expressApp,
      controllers: []
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('hello from express');
  });

  test('sets cors headers', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      sendHello() {
        return 'hello';
      }
    }

    let app = warp({
      cors: true,
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.get('Access-Control-Allow-Origin')).toEqual('*');
    expect(response.text).toEqual('hello');
  });

  test('parses request body', async () => {
    @Controller('/')
    class IndexController {
      @Post('/hello')
      sendBody(@Body() body: unknown) {
        return {
          body
        };
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).post('/hello').send({ post: true });

    expect(response.status).toEqual(200);
    expect(response.text).toEqual(JSON.stringify({ body: { post: true } }));
  });

  test('checks if controllers are valid', async () => {
    expect.assertions(1);

    class IndexController {}

    try {
      let app = warp({
        controllers: [IndexController]
      });
    } catch (err) {
      expect(err.message).toBe('Please mark controllers using the @Controller decorator.');
    }
  });

  test('handles 404 errors', async () => {
    @Controller('/')
    class IndexController {}

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 404,
        message: 'Not Found'
      })
    );
  });

  test('handles http errors in handlers', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      errorHandler() {
        throw new UnauthorizedException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(401);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 401,
        message: 'Unauthorized'
      })
    );
  });
});
