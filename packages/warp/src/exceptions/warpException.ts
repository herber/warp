export class WarpException extends Error {
  constructor(public readonly message: string) {
    super('[WARP Error]: ' + message);
  }
}
