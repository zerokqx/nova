import { createStringNotation } from './create-string-notation.js';
import { parseNotation } from './parse-notation.js';
import { parseSeparator } from './parse-separator.js';
import type { TCreateNotation } from './types/create-notation.type.ts';
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

    inferNotation() {
      return `text${sep}text`;
    },
    parseNotation: parseNotation,
    parseSeparator: parseSeparator,
    createStringNotation: createStringNotation,
  } as ReturnType<TCreateNotation<PartFirst, Separator, PartSecond>>;
};
