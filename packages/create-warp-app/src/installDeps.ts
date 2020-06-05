import isYarnInstalled from 'is-yarn-installed';
import execa from 'execa';

export let installDeps = async (dir: string) => {
  if (isYarnInstalled()) {
    await execa.command('yarn', {
      cwd: dir
    });
  } else {
    await execa.command('npm install', {
      cwd: dir
    });
  }
}
