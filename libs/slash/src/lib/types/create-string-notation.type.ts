import type { TSlashNotation } from './slash-notation.type';

export type TCreateStringNotationFn<
  PartFirst extends string,
  Separator extends string,
  PartSecond extends string
> = (
  partFirst: PartFirst,
  separator: Separator,
  partSecond: PartSecond
) => TSlashNotation<PartFirst, Separator, PartSecond>;
