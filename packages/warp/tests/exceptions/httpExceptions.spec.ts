import request from 'supertest';
import warp, {
  Controller,
  Get,
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GatewayTimeoutException,
  ImATeapotException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  PayloadTooLargeException,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
  GoneException,
  HttpException
} from '../../src';

describe('http exceptions', () => {
  test('bad gateway exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new BadGatewayException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(502);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 502,
        message: 'Bad Gateway'
      })
    );
  });

  test('bad request exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new BadRequestException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(400);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 400,
        message: 'Bad Request'
      })
    );
  });

  test('conflict exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new ConflictException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(409);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 409,
        message: 'Conflict'
      })
    );
  });

  test('forbidden exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new ForbiddenException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(403);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 403,
        message: 'Forbidden'
      })
    );
  });

  test('gateway timeout exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new GatewayTimeoutException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(504);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 504,
        message: 'Gateway Timeout'
      })
    );
  });

  test('gone exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new GoneException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(410);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 410,
        message: 'Gone'
      })
    );
  });

  test('i am a teapot exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new ImATeapotException();
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

  test('internal server error exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new InternalServerErrorException();
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

  test('method not allowed exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new MethodNotAllowedException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(405);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 405,
        message: 'Method Not Allowed'
      })
    );
  });

  test('not acceptable exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new NotAcceptableException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(406);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 406,
        message: 'Not Acceptable'
      })
    );
  });

  test('not found exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new NotFoundException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(404);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 404,
        message: 'Not Found'
      })
    );
  });

  test('not implemented exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new NotImplementedException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(501);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 501,
        message: 'Not Implemented'
      })
    );
  });

  test('payload too large exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new PayloadTooLargeException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(413);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 413,
        message: 'Payload Too Large'
      })
    );
  });

  test('request timeout exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new RequestTimeoutException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(408);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 408,
        message: 'Request Timeout'
      })
    );
  });

  test('service unavailable exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new ServiceUnavailableException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(503);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 503,
        message: 'Service Unavailable'
      })
    );
  });

  test('unauthorized exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new UnauthorizedException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(401);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 401,
        message: 'Unauthorized'
      })
    );
  });

  test('unprocessable entity exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new UnprocessableEntityException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(422);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 422,
        message: 'Unprocessable Entity'
      })
    );
  });

  test('unsupported media type exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new UnsupportedMediaTypeException();
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(415);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 415,
        message: 'Unsupported Media Type'
      })
    );
  });

  test('service unavailable exception', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      exception() {
        throw new HttpException('Something happened', 202);
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(202);
    expect(response.get('Content-Type')).toMatch(/json/);
    expect(response.text).toEqual(
      JSON.stringify({
        status: 202,
        message: 'Something happened'
      })
    );
  });
});
