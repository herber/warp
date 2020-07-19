import request from 'supertest';
import warp, {
  Controller,
  Get,
  UnauthorizedException,
  Req,
  Request as WarpRequest,
  Middleware,
  ImATeapotException,
  Guard
} from '../src';

describe('middleware', () => {
  test('registers before middleware', async () => {
    expect.assertions(4);

    @Controller('/')
    class IndexController {
      @Get('/')
      hi(@Req() req: WarpRequest) {
        expect(req.query.a).toBe('b');
        return req.query.a;
      }
    }

    let app = warp({
      controllers: [IndexController],
      middleware: [
        {
          middleware: (req, res, next) => {
            req.query = { a: 'b' };
            expect(true).toBeTruthy();
            next();
          },
          execution: 'before'
        }
      ]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('b');
  });

  test('registers after middleware', async () => {
    expect.assertions(3);

    @Controller('/')
    class IndexController {}

    let app = warp({
      controllers: [IndexController],
      middleware: [
        {
          middleware: (req, res, next) => {
            expect(true).toBeTruthy();
            res.send('after');
            next();
          },
          execution: 'after'
        }
      ]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('after');
  });

  test('support for legacy middleware', async () => {
    expect.assertions(4);

    @Controller('/')
    class IndexController {
      @Get('/')
      hi(@Req() req: WarpRequest) {
        expect(req.query.a).toBe('b');
        return req.query.a;
      }
    }

    let app = warp({
      controllers: [IndexController],
      middleware: [
        (req, res, next) => {
          req.query = { a: 'b' };
          expect(true).toBeTruthy();
          next();
        }
      ]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('b');
  });

  test('controller based middleware', async () => {
    expect.assertions(4);

    @Controller('/', [
      (req, res, next) => {
        req.query = { a: 'b' };
        expect(true).toBeTruthy();
        next();
      }
    ])
    class IndexController {
      @Get('/')
      hi(@Req() req: WarpRequest) {
        expect(req.query.a).toBe('b');
        return req.query.a;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('b');
  });

  test('handler based middleware', async () => {
    expect.assertions(5);

    @Controller('/')
    class IndexController {
      @Get('/', [
        (req, res, next) => {
          req.query.a = 'Hello';
          expect(true).toBeTruthy();
          next();
        }
      ])
      @Middleware((req, res, next) => {
        req.query.a += ' world';
        expect(true).toBeTruthy();
        next();
      })
      hi(@Req() req: WarpRequest) {
        expect(req.query.a).toBe('Hello world');
        return req.query.a;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello world');
  });

  test('handler based middleware array', async () => {
    expect.assertions(6);

    @Controller('/')
    class IndexController {
      @Get('/', [
        (req, res, next) => {
          req.query.a = 'Hello';
          expect(true).toBeTruthy();
          next();
        }
      ])
      @Middleware([
        (req, res, next) => {
          req.query.a += ' world';
          expect(true).toBeTruthy();
          next();
        },
        (req, res, next) => {
          req.query.a += '!';
          expect(true).toBeTruthy();
          next();
        }
      ])
      hi(@Req() req: WarpRequest) {
        expect(req.query.a).toBe('Hello world!');
        return req.query.a;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello world!');
  });

  test('global, controller and handler middleware', async () => {
    expect.assertions(7);

    @Controller('/', [
      (req, res, next) => {
        req.query.a += ' world';
        expect(true).toBeTruthy();
        next();
      }
    ])
    class IndexController {
      @Get('/', [
        (req, res, next) => {
          req.query.a += ' this';
          expect(true).toBeTruthy();
          next();
        }
      ])
      @Middleware((req, res, next) => {
        req.query.a += ' is';
        expect(true).toBeTruthy();
        next();
      })
      hi(@Req() req: WarpRequest) {
        expect(req.query.a).toBe('Hello world this is');
        return req.query.a + ' warp';
      }
    }

    let app = warp({
      controllers: [IndexController],
      middleware: [
        (req, res, next) => {
          req.query.a = 'Hello';
          expect(true).toBeTruthy();
          next();
        }
      ]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello world this is warp');
  });

  test('error in middleware', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Middleware((req, res, next) => {
        throw new ImATeapotException();
      })
      iLikeCoffee() {
        return 'This method should not be called';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(418);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 418,
        code: 'i_am_a_teapot'
      })
    );
  });

  test('guards protect handlers', async () => {
    @Controller('/')
    class IndexController {
      @Get('/nope')
      @Guard(() => false)
      nope() {
        return 'Very secret';
      }

      @Get('/yeah')
      @Guard(() => true)
      yeah() {
        return 'Public';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let allowedResponse = await request(app).get('/yeah');

    expect(allowedResponse.status).toEqual(200);
    expect(allowedResponse.text).toEqual('Public');

    let forbiddenResponse = await request(app).get('/nope');

    expect(forbiddenResponse.status).toEqual(403);
    expect(forbiddenResponse.text).toEqual(
      JSON.stringify({
        status: 403,
        code: 'forbidden'
      })
    );
  });

  test('guards and middleware', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Middleware((req, res, next) => {
        req.query.ok = 'true';
        next();
      })
      @Guard(req => req.query.ok == 'true')
      guardAndMiddleware() {
        return 'Public';
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Public');
  });
});
