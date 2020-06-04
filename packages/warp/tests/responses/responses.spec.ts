import request from 'supertest';
import { join } from 'path';
import warp, {
  Controller,
  Get,
  FileResponse,
  JSONResponse,
  NextResponse,
  RedirectResponse,
  RenderResponse,
  Param,
  SimpleResponse
} from '../../src';

describe('responses', () => {
  test('file response', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      html() {
        return new FileResponse(join(__dirname, '__fixtures__/something.html'), undefined, 202, {
          'Custom-Header': 'Yup'
        });
      }

      @Get('/defaults')
      defaults() {
        return new FileResponse(join(__dirname, '__fixtures__/something.html'));
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response1 = await request(app).get('/');

    expect(response1.status).toEqual(202);
    expect(response1.get('Content-Type')).toMatch(/html/);
    expect(response1.get('Custom-Header')).toEqual('Yup');
    expect(response1.text).toEqual('<h1>Hello world</h1>');

    let response2 = await request(app).get('/defaults');

    expect(response2.status).toEqual(200);
    expect(response2.get('Content-Type')).toMatch(/html/);
    expect(response2.text).toEqual('<h1>Hello world</h1>');
  });

  test('json response', async () => {
    @Controller('/')
    class IndexController {
      @Get('/object')
      object() {
        return new JSONResponse(
          {
            hello: 'world'
          },
          202,
          {
            'Custom-Header': 'Yup'
          }
        );
      }

      @Get('/array')
      array() {
        return new JSONResponse(['1', 2, true]);
      }

      @Get('/value')
      value() {
        return new JSONResponse('42');
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let responseObject = await request(app).get('/object');

    expect(responseObject.status).toEqual(202);
    expect(responseObject.get('Content-Type')).toMatch(/json/);
    expect(responseObject.get('Custom-Header')).toEqual('Yup');
    expect(responseObject.text).toEqual(
      JSON.stringify({
        hello: 'world'
      })
    );

    let responseArray = await request(app).get('/array');

    expect(responseArray.status).toEqual(200);
    expect(responseArray.get('Content-Type')).toMatch(/json/);
    expect(responseArray.text).toEqual(JSON.stringify(['1', 2, true]));

    let responseValue = await request(app).get('/value');

    expect(responseValue.status).toEqual(200);
    expect(responseValue.get('Content-Type')).toMatch(/json/);
    expect(responseValue.text).toEqual('"42"');
  });

  test('simple response', async () => {
    @Controller('/')
    class IndexController {
      @Get('/json')
      object() {
        return new SimpleResponse(
          {
            hello: 'world'
          },
          202,
          {
            'Custom-Header': 'Yup'
          }
        );
      }

      @Get('/string')
      value() {
        return new SimpleResponse('hello');
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let responseJson = await request(app).get('/json');

    expect(responseJson.status).toEqual(202);
    expect(responseJson.get('Content-Type')).toMatch(/json/);
    expect(responseJson.get('Custom-Header')).toEqual('Yup');
    expect(responseJson.text).toEqual(
      JSON.stringify({
        hello: 'world'
      })
    );

    let responseString = await request(app).get('/string');

    expect(responseString.status).toEqual(200);
    expect(responseString.get('Content-Type')).toMatch(/text/);
    expect(responseString.text).toEqual('hello');
  });

  test('next response', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      next() {
        return new NextResponse();
      }
    }

    let app = warp({
      controllers: [IndexController],
      middleware: [
        {
          execution: 'after',
          middleware: (req, res, next) => {
            res.send('hello from the middleware');
            next();
          }
        }
      ]
    });

    let response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('hello from the middleware');
  });

  test('redirect response', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      redirect() {
        return new RedirectResponse('/other', 307, {
          'changed-path': 'yes'
        });
      }

      @Get('/default')
      default() {
        return new RedirectResponse('/other');
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response1 = await request(app).get('/');

    expect(response1.status).toEqual(307);
    expect(response1.get('changed-path')).toEqual('yes');
    expect(response1.text).toEqual('Temporary Redirect. Redirecting to /other');

    let response2 = await request(app).get('/default');

    expect(response2.status).toEqual(302);
    expect(response2.text).toEqual('Found. Redirecting to /other');
  });

  test('render response', async () => {
    @Controller('/')
    class IndexController {
      @Get('/:name')
      render(@Param('name') name: string) {
        return new RenderResponse(
          join(__dirname, '__fixtures__/view.hbs'),
          {
            name
          },
          202,
          {
            dynamic: 'yes'
          }
        );
      }

      @Get('/default/:name')
      default(@Param('name') name: string) {
        return new RenderResponse(join(__dirname, '__fixtures__/view.hbs'), {
          name
        });
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    app.set('view engine', 'hbs');

    let response1 = await request(app).get('/john');

    expect(response1.status).toEqual(202);
    expect(response1.get('dynamic')).toEqual('yes');
    expect(response1.get('Content-Type')).toMatch(/html/);
    expect(response1.text).toEqual('<h1>Hello john</h1>');

    let response2 = await request(app).get('/default/john');

    expect(response2.status).toEqual(200);
    expect(response2.get('Content-Type')).toMatch(/html/);
    expect(response2.text).toEqual('<h1>Hello john</h1>');
  });
});
