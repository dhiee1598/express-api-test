type Assert = (condition: unknown, message?: string) => asserts condition;

const assertIsDefined: Assert = <T>(val: T): asserts val is NonNullable<T> => {
  if (!eval) throw Error(`Expected 'val' to be defined , but receive ${val}`);
};
export default assertIsDefined;
