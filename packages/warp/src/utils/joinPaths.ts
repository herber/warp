let normalizePath = (path: string) => {
  path = path.startsWith('/') ? path : '/' + path;

  return path.replace(/^(\/)+/gi, '/').replace(/(\/)+$/, '/');
};

let joinInternal = (path: string, base?: string) => {
  if (!base) return path;

  if (path.startsWith('/') && base.endsWith('/')) return base + path.substring(1);
  if (path.startsWith('/') && !base.endsWith('/')) return base + path;
  if (!path.startsWith('/') && base.endsWith('/')) return base + path;
  if (!path.startsWith('/') && !base.endsWith('/')) return base + '/' + path;
};

export let joinPaths = (path: string, base?: string) => normalizePath(joinInternal(path, base));
