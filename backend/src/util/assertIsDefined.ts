export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (!eval) throw Error(`Expected 'val' to be defined , but receive ${val}`);
}
