import request from 'supertest';
import warp, { Controller, Get, Body } from '../../src';
import { IsString, IsNotEmpty } from 'class-validator';

describe('body param', () => {
  test('body params', async () => {
    @Controller('/')
    class IndexController {
      @Get('/')
      handler(@Body() body: any) {
        return body;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let response = await request(app).get('/').send({
      hello: 'world'
    });
    expect(response.status).toEqual(200);
    expect(response.text).toEqual(
      JSON.stringify({
        hello: 'world'
      })
    );
  });

  test('body validation', async () => {
    class BodyDTO {
      @IsString()
      @IsNotEmpty()
      hello: string;
    }

    @Controller('/')
    class IndexController {
      @Get('/')
      handler(@Body() body: BodyDTO) {
        return body;
      }
    }

    let app = warp({
      controllers: [IndexController]
    });

    let responseAccept = await request(app).get('/').send({
      hello: 'world'
    });
    expect(responseAccept.status).toEqual(200);
    expect(responseAccept.text).toEqual(
      JSON.stringify({
        hello: 'world'
      })
    );

    let responseDeny = await request(app).get('/').send({
      hello: 123
    });
    expect(responseDeny.status).toEqual(406);
    expect(responseDeny.body.status).toEqual(406);
    expect(responseDeny.body.message).toEqual('Invalid Request Data');
    expect(responseDeny.body.validationErrors).toBeDefined();
  });
});
