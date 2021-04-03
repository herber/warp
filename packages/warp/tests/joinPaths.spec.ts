import { joinPaths } from '../src/utils/joinPaths';

describe('joinPaths', () => {
  test('joins paths', async () => {
    expect(joinPaths('abc')).toBe('/abc');
    expect(joinPaths('/abc')).toBe('/abc');
    expect(joinPaths('///abc//')).toBe('/abc/');

    expect(joinPaths('/abc', 'xyz')).toBe('/xyz/abc');
    expect(joinPaths('abc', 'xyz')).toBe('/xyz/abc');
    expect(joinPaths('abc', 'xyz/')).toBe('/xyz/abc');
    expect(joinPaths('/abc', '/xyz')).toBe('/xyz/abc');
    expect(joinPaths('abc', 'xyz')).toBe('/xyz/abc');

    expect(joinPaths('abc', 'xyz/')).toBe('/xyz/abc');
    expect(joinPaths('/abc', 'xyz/')).toBe('/xyz/abc');
    expect(joinPaths('/abc/', '/xyz/')).toBe('/xyz/abc/');

    expect(joinPaths('/abc///', '///xyz/')).toBe('/xyz/abc/');

    expect(joinPaths('/ab/c///', '///x/yz/')).toBe('/x/yz/ab/c/');

    expect(joinPaths('/abc', '/')).toBe('/abc');

    expect(joinPaths('/', '/xyz')).toBe('/xyz/');
    expect(joinPaths('', '/xyz')).toBe('/xyz/');
  });
});
