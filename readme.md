<p align="center">
  <img src="https://i.imgur.com/OLt55Xe.png" width="100%">
</p>

<h3 align="center">
  <b>Minimalist framework for building APIs in TypeScript.</b> 
</h3>

<p align="center">
  <a href="https://github.com/varld/warp/blob/master/readme.md#getting-started">Getting Started</a>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <a href="https://github.com/varld/warp/blob/master/readme.md#examples">Examples</a>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <a href="https://github.com/varld/warp/blob/master/readme.md#authentication">Authentication</a>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <a href="https://github.com/varld/warp/blob/master/readme.md#accessing-the-request-body">Validation</a>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <a href="https://github.com/varld/warp/blob/master/readme.md#dependency-injection">Dependency Injection</a>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <a href="https://github.com/varld/warp/blob/master/readme.md#testing">Testing</a>
</p>

<br />

## Features

- 🔋 __Batteries includes:__ Cors, dependency injection and body parsing are already set up.
- 🚀 __Written in Typescript:__ No need to worry about inconsistent types.
- 🤷‍♂️ __Unopinionated:__ We don't force you to do anything.
- 🏭 __Built on Express:__ Warp is compatible with all existing Express packages.
- ✨ __Support for `async`/`await`:__ Warp helps you escape the callback hell.
- 🔥 __Easy to get started with:__ One file with a few lines of code is all you need.
- 👋 __Built in authentication:__ Warp has build in support for token authentication.

## Why

About a year ago I fell in love with Nest.js, however after building a couple of bigger projects with it I noticed, that it forces me to do things in counterintuitive ways while offering features that I hardly ever used. On the other hand, Express is great but really barebones. You have to set up body parsing, authentication and routing for every project.

__Warp__ aims to be a combination of the great API that Nest.js offers while maintaining the simplicity of Express. Warp is a clever combination of a few standard packages, which together offer controller based routing, authentication, dependency injection, validation and reduce code duplication.

## Getting Started

### Using Warp CLI

Warp CLI creates a simple TypeScript project with a very basic Warp API and test.

```bash
npx create-warp-app
```

### Custom Setup

You can easily set up your own warp project. This guide assumes that you already have a Node.js project with TypeScript set up.

#### Install Warp

```bash
# Using npm
npm install @varld/warp 

# Using yarn
yarn add @varld/warp 
```

#### Setting up TypeScript

Warp uses decorators and reflection, those two features have to be enabled in the `tsconfig.json` file.

```json
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

#### Creating a Simple API

```typescript
import warp, { Controller, Get, Param } from '@varld/warp';

@Controller('/')
class GreetingController {
  @Get('/:name')
  greet(@Param('name') name: string) {
    return `Hello ${ name }`;
  }
}

let app = warp({
  controllers: [GreetingController]
});

app.listen(3000);
```

That's it! 🎉 Go ahead and visit [`http://localhost:3000/your-name`](http://localhost:3000/your-name) in a browser.

Now let's take a look at what the code above does exactly. 

1. On the first line, we import `warp` and a few decorators, which we are using later.
2. Nest, we create a controller-class. All controllers must have the `@Controller('/...')` decorator, with the base-path of the controller as the first argument.
3. Within the controller class we create an HTTP-Handler (called greet) using the `@Get('/...')` decorator. This decorator indicates, that the handler listens to `GET` request under the path supplied in the first argument. Of course there are decorators for all other HTTP-Methods as well.
4. The `greet` has a single argument decorated with `@Param('name')`. This indicates, that we want to extract a `path-param` called `name` from the url.
5. Withing the `greet` method we return a string containing the supplied name.
6. Now we set up a warp-instance and tell it about our controller. The `warp` function returns a _standard Express app_.
7. Finally we tell the warp-instance to listen to port 3000.

Pretty simple, right. ✌️

## Usage

### File Structure

While Warp does not force you do adhere to a specific file structure, there is one that we think works very well.

```
/src
  package.json
  index.ts
  /controllers
    controllerName.ts
  /services
    serviceName.ts
/tests
  testName.spec.ts
```

In the root of the project, there is an `index.ts`-file, which create a Warp instance and sets everything up.
The `controllers` directory houses all controllers. Each controller should have its own file named accordingly. 
The `services` directory contains all services. Each file should contain just one service.

If you are using authentication, you could extract the authenticator into its own file.

### Handler Methods

Warp has decorators for all popular HTTP-Methods. They all basically work the same.

```typescript
@Controller('/')
class MyController {
  @Get('/') // Listens to GET requests
  getSomething() { /*...*/ }

  @Post('/') // Listens to POST requests
  createSomething() { /*...*/ }

  @Put('/') // Listens to PUT requests
  overrideSomething() { /*...*/ }

  @Patch('/') // Listens to PATCH requests
  updateSomething() { /*...*/ }

  @Delete('/') // Listens to DELETE requests
  deleteSomething() { /*...*/ }

  @Head('/') // Listens to HEAD requests
  headRequest() { /*...*/ }

  @Options('/') // Listens to OPTIONS requests
  optionsRequest() { /*...*/ }
}
```

### Middleware

Warp is compatible with all existing Express middleware, however installing it is a bit different.

#### Global Middleware

Global middleware is executed on every request. You can optionally specify if it should be executed before or after the request handler methods.

```typescript
// Default behavior
let app = warp({
  controllers: [...],
  middleware: [
    aMiddlewareFunction,
    anotherOne,
    ...
  ]
});

// Specify when the middleware should be executed
let app = warp({
  controllers: [...],
  middleware: [
    {
      // Will be executed before request handlers
      execution: 'before',
      middleware: setupMiddleware,
    },
    {
      // Will be executed after request handlers
      execution: 'after',
      middleware: cleanupMiddleware,
    }
    ...
  ]
});
```

#### Controller-based middleware

Controller-based middleware will be executed before every handler method within a controller. This is useful if you want to perform an action for every handler of a controller.

```typescript
@Controller('/', [
  aMiddlewareFunction,
  anotherOne,
  ...
])
class MyController {
  ...
}
```

#### Handler-based middleware

Handler-based middleware is specific to selected request handlers. Handler-based middleware can be specified using the second parameter of `@Get` or any other method decorator or using the `@Middleware()` decorator. You can also use bot variant together.

```typescript
@Get('/:name', [
  aMiddlewareFunction,
  ...
])
@Middleware(anotherMiddlewareFunction)
@Middleware([
  aMiddlewareFunctionInAnArray,
  oneMore,
  ...
])
handler() {
  ...
}
```

### Guards

As the name suggests, guards are used to protect handlers. Guards are decorators, which receive a function that returns either `true` or `false`. If `true` is returned, the handler will be executed normally. If `false` is returned, the handler will not be executed and a `Forbidden`-Error will sent to the client instead. The function in the guard receives the `request` object as its first argument.

Guards are especially useful if you want to make a handler only accessible to users with special permissions.

```typescript
@Get('/')
@Guard((req) => false)
handler() {
  return `This will not be executed`;
}
```

### Responses

By default, everything you return in a handler function will be sent to client with the `200` status code. If you return a string, that string will sent to the client as is. If you return an object, that object will be converted to JSON. Depending on the return type a matching `Content-Type`-header will be chosen. You can use responses to manipulate this behavior.

#### JSON Response

Everything you provide to the JSON-Response will be converted to JSON. In addition to the response data you can also specify a custom status code and additional http-headers.

```typescript
@Get('/')
handler() {
  return new JSONResponse({
    /* some data */
  });
}

// With a statuscode and custom headers
@Get('/')
handler() {
  return new JSONResponse({
    /* some data */
  }, 202, {
    'Custom': 'Header'
  });
}
```

#### File Response

File responses can be used to serve local files.

`new FileResponse(filePath, [expressSendFileOptions, status, headers])`

#### Next Response

The next response can be used to call Express's `next()` function. Which tells Express to continue to the next middleware.

`new NextResponse()`

#### Redirect Response

Using the redirect response, you can redirect the client to a different url.

`new RedirectResponse(location, [status, headers])`

#### Render Response

The render response can be used to access Express's internal template rendering. For this to work you must configure a view engine first.

```typescript
import warp, { Controller, Get, Param } from '@varld/warp';

@Controller('/')
class MyController {
  @Get('/')
  render() {
    return new RenderResponse('view name', {
      /* view data */
    });
  }
}

let app = warp({
  controllers: [MyController]
});

app.set('view engine', 'a view engine');

app.listen(3000);
```

#### Simple Response

The simple response behaves similar to just returning the value, however using the simple response you can optionally add a status code and custom headers.

`new RedirectResponse(data, [status, headers])`

### Accessing request data

Warp offers a variety of decorators you can use to get request data, like path parameters, query, cookies and more.

#### Query parameters

You can access query parameters using the `@Query()` decorator. If you want to get a specific value from the query object you can also pass the value's name as a parameter.

```typescript
@Controller('/')
class MyController {
  // Get all query parameters as an object
  @Get('/all')
  handler(@Query() everything: any) {
    ...
  }

  // Get a single query parameter called name
  @Get('/one')
  handler(@Query('name') name: string) {
    ...
  }
}
```

#### Headers

The header parameter behaves similar to the `@Query()`. When `@Header()` receives no argument you will get an object containing all header values, however you can optionally specify a header name as the first parameter.

```typescript
@Controller('/')
class MyController {
  // Get all headers as an object
  @Get('/all')
  handler(@Header() everything: any) {
    ...
  }

  // Get the "Content-Type" header
  @Get('/one')
  handler(@Header('Content-Type') contentType: string) {
    ...
  }
}
```

#### Cookies

Using the cookie parameter, you can easily access cookies. When no parameter is specified, you will get an array containing all cookies. Optionally you can specify a cookie's name in the first parameter.

```typescript
@Controller('/')
class MyController {
  // Get all cookies as an object
  @Get('/all')
  handler(@Cookie() everything: any) {
    ...
  }

  // Get a single cookie called token
  @Get('/one')
  handler(@Cookie('token') token: string) {
    ...
  }
}
```

Warp also has decorators for setting and clearing cookies.

```typescript
@Controller('/')
class MyController {
  @Get('/')
  handler(
    @SetCookie() setCookie: CookieSetter,
    @ClearCookie() clearCookie: CookieClearer,
  ) {
    setCookie('name', 'value', {
      /* options */
    });

    clearCookie('name');
  }
}
```

You can use `setCookie` to set cookies. The first param must be the cookies name, the second param is the cookies value using the third param, you can optionally specify [additional options](http://expressjs.com/en/4x/api.html#res.cookie), like an expiration date.

`clearCookie` can be used to remove a cookie. The first parameter is the cookies name.

#### Path Parameters

Warp inherits support for parameters in the URL path from Express. You can use the `@Param()` decorator to access all or one specify url parameter.

```typescript
@Controller('/')
class MyController {
  // Get all params as an object
  @Get('/users/:userId/task/:taskId')
  handler(@Param() everything: any) {
    ...
  }

  // Get a single param called userId
  @Get('/users/:userId')
  handler(@Param('userId') userId: string) {
    ...
  }
}
```

#### Request Object

In some cases you might want to access Express's native request object. You can do this using the `@Req()` decorator. You should avoid using `@Req()` if possible and use the decorators listed above instead.

```typescript
@Controller('/')
class MyController {
  @Get('/')
  handler(@Req() req: Request) {
    ...
  }
}
```

#### Response Object

You might need to access Express's native response object. You can do this using the `@Res()` decorator. In most cases you should use Warp's response classes instead.

```typescript
@Controller('/')
class MyController {
  @Get('/')
  handler(@Res() res: Response) {
    ...
  }
}
```

#### Custom Parameters

In addition to the built in parameter decorators, Warp also offers the ability to create custom parameters.

```typescript
import { BaseParam, ... } from '@varld/warp';

let CustomParam = () => {
  BaseParam((req, res) => req.ip);
};

@Controller('/')
class MyController {
  @Get('/')
  handler(@CustomParam() ip: string) {
    return `Your IP-Address is: ${ ip }`;
  }
}
```

### Enabling CORS

Warp includes native support for cors. You can enable cors when creating a new Warp instance.

```typescript
let app = warp({
  controllers: [/*...*/],
  cors: true
});

// ...
```

`cors` is optional and can be a `boolean` or a [cors-options-object](https://github.com/expressjs/cors#configuration-options). By default the `cors` value is `false` and hance cors is disabled. 

### Accessing the Request Body

Warp has support for accessing, validating and transforming the request body using the `@Body()` decorator.

```typescript
@Controller('/')
class MyController {
  @Post('/')
  handler(@Body() body: any) {
    // do something with the body
  }
}
```

#### Validating The Request Body

Request body validation is achieved using [class validator](https://github.com/typestack/class-validator). Class validator makes it easy to specify validation rules using decorators.

```typescript
class MyBody {
    @Length(5, 25)
    title: string;

    @Contains('hello')
    text: string;

    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;
}

@Controller('/')
class MyController {
  @Post('/')
  handler(@Body() body: MyBody) {
    // The body has already been validated 
    // and can be used now.
  }
}
```

If the body is not valid, a not acceptable error, including an array of validation-errors will be sent to the client. In this case the handler will not be executed.

### Authentication

Authentication is important for many APIs. Warp includes support for standard token authentication using a header or a query parameter. By default warp is configured to support bearer authentication.

#### The Authenticator

Warp automatically extracts a token from the request object. If a token exists, the token will be handed to an async authenticator function, which you have to implement.

Warp expects you to return a user. This user can be of any type.

If no user is returned, warp will not execute any handlers and send an unauthorized error to the client.

```typescript
let app = warp({
  controllers: [/*...*/],
  authenticator: async (token: string, req: Request) => {
    // fetch user by token from database
    let user = await db.getUserByToken(token);

    return user;
  }
});
```

#### Enabling Authentication

Warp supports two types of authentication: global authentication, which protects every route of the warp instance and handler based authentication, using the `@Authenticated()` decorator.

__Global authentication:__

```typescript
let app = warp({
  // ...
  authentication: {
    global: true
  }
});
```

__Handler based authentication:__

```typescript
@Controller('/')
class MyController {
  @Get('/')
  @Authenticated()
  handler() {
    // The user is authenticated
  }
}
```

#### Accessing The User

In authenticated routes, the user (from the authenticator function) can be accessed using the `@User()` decorator.

```typescript
@Controller('/')
class MyController {
  @Get('/')
  @Authenticated()
  handler(@User() user: MyUser) {
    // Do something with the user
  }
}
```

#### Authentication Options

By default, Warp will check the `Authorization` header and the `access_token` query parameter. Warp expects tokens in the `Authorization` header to be prefixed with the `bearer` keyword. This behavior can be altered using `authentication` object when creating a warp instance.

```typescript
let app = warp({
  // ...
  authentication: {
    global: false,
    header: 'Authorization',
    headerScheme: 'bearer',
    query: 'access_token'
  }
});
```

### Dependency Injection

Warp has support for dependency injection in controllers using [typedi](https://github.com/typestack/typedi). Injectable classes must be marked using the `@Service()` decorator.

```typescript
@Service()
class MyService {
  doSomething() {
    return 'did something';
  }
}

@Controller('/')
class MyController {
  constructor(private myService: MyService) {}

  @Get('/')
  handler() {
    return this.myService.doSomething();
  }
}
```

### Testing

Testing a warp app is very simple, since warp apps are basically just Express apps. The simples way to test an api built with warp is using [supertest](https://github.com/visionmedia/supertest). Supertest has also been used to test the warp library itself, take a look at [the tests](https://github.com/varld/warp/tree/master/packages/warp/tests) to learn more.

```typescript
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
```

## Examples

- [A basic Warp app](https://github.com/varld/warp/tree/master/examples/simple)
- [Warp, TypeORM and authentication](https://github.com/varld/warp/tree/master/examples/with-typeorm-auth)
- [Warp's test suite](https://github.com/varld/warp/tree/master/packages/warp/tests)

## Questions and Answers

### What was the inspiration for Warp?

Warp was mostly inspired by [Nest.js](https://nestjs.com/), [Tachijs](https://github.com/BoostIO/tachijs) and [Express](https://expressjs.com/). All of those libraries are amazing and I greatly appreciate their maintainers! Warp would not exist without those libraries.

### Can't I just use Next.js?

Yeah! Nest.js is great, but it includes a lot of bloat that most people don't need or don't even know about, like _Interceptors_, or built in support for microservice. Warp aims be much simple, while offering the features most APIs need. 

If you need a bunch of abstractions and enterprise-level features, then Nest.js is great. If you want to build an API (big or small) but don't need all of those features, then Warp is a great choice.

### Can't I just use Express?

Sure! Warp is built on Express. Express is battle tested and very unopinionated, so you can build basically anything with Express. Since Express does not do that much by itself you will have to write a lot of boilerplate the get started. Warp comes will all of the basics, like body parsing and cors, already setup and extends Express with controllers, useful decorators and authentication.

### Is Warp safe to use?

Honestly, Warp is a really simple library. All it does is glueing a few other libraries together. All of those libraries are battle tested and used by thousands (sometimes even millions) of developers. In addition to that Warp is very well tested (99% coverage). So it is safe to say, that you can safely use Warp in production. However, if you do encounter any problems or inconveniences feel free to open an issue or pr on Warp's GitHub.

## License

MIT © [Tobias Herber](https://herber.space)
