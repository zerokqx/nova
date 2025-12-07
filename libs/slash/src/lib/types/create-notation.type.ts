import type { TCreateStringNotationFn } from './create-string-notation.type';
import type { TParseNotationFn } from './parse-notation.type';
import type { TParseSeparatorFn } from './parse-separator.type';
export type TCreateNotation<
  PartFirst extends string = string,
  Separator extends string = '/',
  PartSecond extends string = string
> = (sep: Separator) => {
  inferSep: () => Separator;
  parseNotation: TParseNotationFn<PartFirst, Separator, PartSecond>;
  parseSeparator: TParseSeparatorFn<PartFirst, Separator, PartSecond>;
  createStringNotation: TCreateStringNotationFn<
    PartFirst,
    Separator,
    PartSecond
  >;
  inferNotation: () => string;
};
