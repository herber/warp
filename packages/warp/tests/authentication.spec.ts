import request from 'supertest';
import warp, { Controller, Get, Query, ImATeapotException, Middleware, User, Authenticated } from '../src';

describe('authentication', () => {
  test('global authentication', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      authenticated(@User() user: string) {
        return user;
      }
    }

    let app = warp({
      controllers: [IndexController],
      authentication: {
        global: true
      },
      authenticator: (token, req) => {
        if (token == '1234') {
          return 'authenticated';
        }

        return 'unauthenticated';
      }
    });

    let responseAllow = await request(app).get('/').set('Authorization', 'bearer 1234');
    expect(responseAllow.status).toEqual(200);
    expect(responseAllow.text).toEqual('authenticated');

    let responseDeny = await request(app).get('/').set('Authorization', 'bearer 5678');
    expect(responseDeny.status).toEqual(200);
    expect(responseDeny.text).toEqual('unauthenticated');
  });

  test('handler based authentication', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Authenticated()
      authenticated(@User() user: string) {
        return user;
      }

      @Get('/public')
      public() {
        return 'public';
      }
    }

    let app = warp({
      controllers: [IndexController],
      authenticator: (token, req) => {
        return 'authenticated';
      }
    });

    let responseAllow = await request(app).get('/').set('Authorization', 'bearer 1234');
    expect(responseAllow.status).toEqual(200);
    expect(responseAllow.text).toEqual('authenticated');

    let responseDeny = await request(app).get('/');
    expect(responseDeny.status).toEqual(406);
    expect(responseDeny.text).toEqual(
      JSON.stringify({
        status: 406,
        code: 'missing_token',
        message: 'No authentication token specified'
      })
    );

    let responsePublic = await request(app).get('/public');
    expect(responsePublic.status).toEqual(200);
    expect(responsePublic.text).toEqual('public');
  });

  test('handler based authentication with middleware', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Middleware((req, res, next) => next())
      @Authenticated()
      @Middleware((req, res, next) => next())
      authenticated(@User() user: string) {
        return user;
      }
    }

    let app = warp({
      controllers: [IndexController],
      authenticator: (token, req) => {
        return 'authenticated';
      }
    });

    let responseAllow = await request(app).get('/').set('Authorization', 'bearer 1234');
    expect(responseAllow.status).toEqual(200);
    expect(responseAllow.text).toEqual('authenticated');
  });

  test('missing auth token', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Authenticated()
      authenticated(@User() user: string) {
        return user;
      }
    }

    let app = warp({
      controllers: [IndexController],
      authenticator: (token, req) => {
        return 'authenticated';
      }
    });

    let responseAllow = await request(app).get('/').set('Authorization', 'bearer 1234');
    expect(responseAllow.status).toEqual(200);
    expect(responseAllow.text).toEqual('authenticated');

    let responseDeny = await request(app).get('/');
    expect(responseDeny.status).toEqual(406);
    expect(responseDeny.text).toEqual(
      JSON.stringify({
        status: 406,
        code: 'missing_token',
        message: 'No authentication token specified'
      })
    );
  });

  test('invalid auth token prefix', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Authenticated()
      authenticated(@User() user: string) {
        return user;
      }
    }

    let app = warp({
      controllers: [IndexController],
      authenticator: (token, req) => {
        return 'authenticated';
      }
    });

    let response = await request(app).get('/').set('Authorization', 'token 1234');
    expect(response.status).toEqual(406);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 406,
        code: 'invalid_scheme',
        message: '"token" is not a valid authentication scheme.'
      })
    );
  });

  test('auth token as query param', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Authenticated()
      authenticated(@User() user: string) {
        return user;
      }
    }

    let app = warp({
      controllers: [IndexController],
      authenticator: (token, req) => {
        if (token == '1234') {
          return 'authenticated';
        }

        return 'unauthenticated';
      }
    });

    let responseAllow = await request(app).get('/?access_token=1234');
    expect(responseAllow.status).toEqual(200);
    expect(responseAllow.text).toEqual('authenticated');

    let responseDeny = await request(app).get('/');
    expect(responseDeny.status).toEqual(406);
    expect(responseDeny.text).toEqual(
      JSON.stringify({
        status: 406,
        code: 'missing_token',
        message: 'No authentication token specified'
      })
    );
  });

  test('no user found', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      @Authenticated()
      authenticated(@User() user: string) {
        return user;
      }
    }

    let app = warp({
      controllers: [IndexController],
      authenticator: (token, req) => {
        return undefined;
      }
    });

    let responseDeny = await request(app).get('/').set('Authorization', 'bearer 1234');
    expect(responseDeny.status).toEqual(401);
    expect(responseDeny.text).toEqual(
      JSON.stringify({
        status: 401,
        code: 'unauthorized'
      })
    );
  });
});
