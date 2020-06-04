import request from 'supertest';
import warp, { Controller, Get, Query, ImATeapotException, Middleware } from '../../src';

describe('exceptions', () => {
  test('custom exception message', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new ImATeapotException('Custom text');
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(418);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 418,
        message: 'Custom text'
      })
    );
  });

  test('dynamic http exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception(@Query('shouldThrow') shouldThrow?: string) {
        if (shouldThrow) {
          throw new ImATeapotException();
        }

        return 'ok';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let responseOk = await request(app).get('/');
    expect(responseOk.status).toEqual(200);
    expect(responseOk.text).toEqual('ok');

    let responseErr = await request(app).get('/?shouldThrow=true');

    expect(responseErr.status).toEqual(418);
    expect(responseErr.get('Content-Type')).toMatch(/json/);
    expect(responseErr.text).toEqual(
      JSON.stringify({
        status: 418,
        message: 'I am a Teapot'
      })
    );
  });

  test('exception in middleware', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Middleware((req, res, next) => {
        throw new ImATeapotException();
      })
      exception() {
        return 'This method should not be called';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(418);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 418,
        message: 'I am a Teapot'
      })
    );
  });

  test('500 error', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new Error('Something weird happened!');
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(500);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 500,
        message: 'Internal Server Error'
      })
    );
  });
});
