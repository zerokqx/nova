import { createStringNotation } from './create-string-notation';
import { parseNotation } from './parse-notation';
import { parseSeparator } from './parse-separator';
import type { TCreateNotation } from './types/create-notation.type';
export const createNotation = <
  PartFirst extends string = string,
  Separator extends string = '/',
  PartSecond extends string = string
>(
  sep: Separator
) => {
  return {
    inferSep() {
      return sep as Separator;
    },
    parseNotation: parseNotation,
    parseSeparator: parseSeparator,
    createStringNotation: createStringNotation,
  } as ReturnType<TCreateNotation<PartFirst, Separator, PartSecond>>;
};
