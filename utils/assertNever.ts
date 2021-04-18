export function assertNever(x: never): never {
  throw new Error(`${x} is not handled`);
}
