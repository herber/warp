import request from 'supertest';
import warp from '@varld/warp';
import { GreetingController } from '../src/controllers/greetingController';

test('greets unknown', async () => {
  let app = warp({
    controllers: [
      GreetingController
    ]
  });

  let response = await request(app).get('/');

  expect(response.status).toEqual(200);
  expect(response.text).toEqual('Hello unknown');
});

test('greets by name', async () => {
  let app = warp({
    controllers: [
      GreetingController
    ]
  });

  let response = await request(app).get('/John');

  expect(response.status).toEqual(200);
  expect(response.text).toEqual('Hello John');
});

test('greets cowboys by name', async () => {
  let app = warp({
    controllers: [
      GreetingController
    ]
  });

  let response = await request(app).get('/cowboy/John');

  expect(response.status).toEqual(200);
  expect(response.text).toEqual('Howdy John');
});
