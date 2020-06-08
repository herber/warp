import fs from 'fs-extra';
import { join } from 'path';

let createPackage = (dir: string, tests: boolean, name: string) => {
  let testDeps = `,
    "@types/jest": "^25.2.3",
    "jest": "^26.0.1",
    "ts-jest": "^26.1.0",
    "supertest": "^4.0.2"`;

  let testScripts = `,
    "test": "jest"`;

  let data = `{
  "name": "${name}",
  "version": "1.0.0",
  "main": "src/index.ts",
  "license": "MIT",
  "dependencies": {
    "ts-node": "^8.10.2",
    "typescript": "^3.9.3",
    "@varld/warp": "latest"
  },
  "scripts": {
    "start": "ts-node ./src/index.ts"${tests ? testScripts : ''}
  },
  "devDependencies": {
    "@types/node": "^14.0.10"${tests ? testDeps : ''}
  }
}
`;

  return fs.writeFile(join(dir, 'package.json'), data);
};

let createTSConfig = (dir: string) => {
  let data = `{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "target": "es6",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./src",
    "incremental": true
  },
  "exclude": ["node_modules"]
}
`;

  return fs.writeFile(join(dir, 'tsconfig.json'), data);
};

let createJestConfig = (dir: string) => {
  let data = `module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'js']
};
`;

  return fs.writeFile(join(dir, 'jest.config.js'), data);
};

let createIndexTs = (dir: string) => {
  let data = `import warp from '@varld/warp';
import { GreetingController } from './controllers/greetingController';

let app = warp({
  controllers: [
    GreetingController
  ]
});

app.listen(3000, () => {
  console.log('🔥  Woohoo your API is ready on http://localhost:3000');
});
`;

  return fs.writeFile(join(dir, 'src/index.ts'), data);
};

let createController = (dir: string) => {
  let data = `import { Controller, Get, Param } from '@varld/warp';
import { GreetingService } from '../services/greetingService';

@Controller('/')
export class GreetingController {
  constructor(
    private greetingService: GreetingService
  ) {}

  @Get('/')
  greetUnknown() {
    return this.greetingService.sayHello('unknown');
  }

  @Get('/:name')
  greetByName(@Param('name') name: string) {
    return this.greetingService.sayHello(name);
  }

  @Get('/cowboy/:name')
  greetCowboy(@Param('name') name: string) {
    return this.greetingService.sayHowdy(name);
  }
}
`;

  return fs.writeFile(join(dir, 'src/controllers/greetingController.ts'), data);
};

let createService = (dir: string) => {
  let data = `import { Service } from '@varld/warp';

@Service()
export class GreetingService {
  sayHello(name: string) {
    return \`Hello \${name}\`;
  }

  sayHowdy(name: string) {
    return \`Howdy \${name}\`;
  }
}
`;

 return fs.writeFile(join(dir, 'src/services/greetingService.ts'), data);
};

let createTest = (dir: string) => {
  let data = `import request from 'supertest';
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
`;

 return fs.writeFile(join(dir, 'tests/greeting.spec.ts'), data);
};

export let createFiles = async (dir: string, tests: boolean, name: string) => {
  await fs.mkdirp(join(dir, 'src', 'services'));
  await fs.mkdirp(join(dir, 'src', 'controllers'));
  await createPackage(dir, tests, name);
  await createTSConfig(dir);
  await createService(dir);
  await createController(dir);
  await createIndexTs(dir);

  if (tests) {
    await fs.mkdirp(join(dir, 'tests'));
    await createTest(dir);
    await createJestConfig(dir);
  }
};
