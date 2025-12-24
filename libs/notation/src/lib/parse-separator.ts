import type { TSlashNotation } from './types/slash-notation.type.ts';

export const parseSeparator = <
  PartFirst extends string = string,
  Separator extends string = '/',
  PartSecond extends string = string
>(
  value: TSlashNotation<PartFirst, Separator, PartSecond>
): Separator | undefined => {
  const re = /^([^/|\\-]+)([/|\\-])([^/|\\-]+)$/;
  const separator = value.match(re);
  console.log(separator);
  if (separator && separator[2]) return separator[2] as Separator;
  return undefined;
};
