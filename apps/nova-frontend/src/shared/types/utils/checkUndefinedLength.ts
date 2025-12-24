export const checkUndefinedLength = (
  data: undefined | { length: number },
  size: number,
) => data && data.length > size;
