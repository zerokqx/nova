import { parseSeparator } from './parse-separator';
import type { TBeforeSplit, TSlashNotation } from './types/slash-notation.type';
export const parseNotation = <
  PartFirst extends string = string,
  Separator extends string = '/',
  PartSecond extends string = string
>(
  notatonString: TSlashNotation<PartFirst, Separator, PartSecond>,
  separator?: Separator
): { partFirst: PartFirst; partSecond: PartSecond } | undefined => {
  const sep =
    separator ||
    parseSeparator<PartFirst, Separator, PartSecond>(notatonString);
  if (sep) {
    const parsedValue = notatonString.split(sep) as TBeforeSplit<
      PartFirst,
      PartSecond
    >;
    return {
      partFirst: parsedValue[0] as PartFirst,
      partSecond: parsedValue[1] as PartSecond,
    } as const;
  }
  return undefined;
};
