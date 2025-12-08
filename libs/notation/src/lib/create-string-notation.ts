import type { TSlashNotation } from './types/slash-notation.type.ts';

export const createStringNotation = <
  PartFirst extends string,
  Separator extends string,
  PartSecond extends string
>(
  partFirst: PartFirst,
  separator: Separator,
  partSecond: PartSecond
): TSlashNotation<PartFirst, Separator, PartSecond> => {
  if (partFirst.length === 0 || partSecond.length === 0) {
    throw new Error('Parts the length is not more than 0 ');
  }
  return `${partFirst}${separator}${partSecond}`;
};
