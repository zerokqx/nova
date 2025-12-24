import type { TSlashNotation } from './slash-notation.type.ts';

export type TParseNotationFn<
  PartFirst extends string = string,
  Separator extends string = '/',
  PartSecond extends string = string
> = (
  notationString: TSlashNotation<PartFirst, Separator, PartSecond>,
  separator?: Separator
) => { partFirst: PartFirst; partSecond: PartSecond } | undefined;
