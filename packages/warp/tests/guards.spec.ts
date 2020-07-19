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

describe('guards', () => {
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

  test('error in guard', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Guard(() => {
        throw new UnauthorizedException();
      })
      guardAndMiddleware() {
        return 'Public';
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
        code: 'unauthorized'
      })
    );
  });
});
