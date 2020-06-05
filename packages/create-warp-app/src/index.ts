import sade from 'sade';
import fs from 'fs-extra';
import { join, resolve, basename } from 'path';
import { createFiles } from './createFiles';
import { installDeps } from './installDeps';

let pkg = require(join(__dirname, '../package.json'));

sade('create-warp-app [dir]', true)
  .version(pkg.version)
  .describe('Create a new Warp project.')
  .example('')
  .example('./api')
  .example('./api --no-tests')
  .example('./api --tests=false')
  .option('-T, --tests', 'Do or do not create tests (default: true)')
  .action(async (dir, opts) => {
    let tests = true;
    let directory = dir ? resolve(process.cwd(), dir) : process.cwd();
    let name = basename(directory);

    if (typeof opts.tests == 'boolean') {
      tests = opts.tests;
    } else {
      if (opts.tests == 'true' || opts.tests == 'yes' || opts.tests == '1' || opts.tests == 1) {
        tests = true;
      } else if (opts.tests == 'false' || opts.tests == 'no' || opts.tests == '0' || opts.tests == 0) {
        tests = false;
      }
    }

    if (fs.existsSync(directory)) {
      let files = await fs.readdir(directory);

      if (files.length > 0) {
        return console.log('🚨  The specified directory is not empty.');
      }
    }

    console.log('🚀  Setting up new Warp project.');

    try {
      await createFiles(directory, tests, name);
    } catch (err) {
      return console.error('🚨  Could not create project files.');
    }

    console.log('⏰  Installing nodemodules.');

    try {
      await installDeps(directory);
    } catch (err) {
      return console.error('🚨  Could not install dependencies.', err.message);
    }

    console.log('🎉  Your new Warp project is ready.');
  })
  .parse(process.argv);
