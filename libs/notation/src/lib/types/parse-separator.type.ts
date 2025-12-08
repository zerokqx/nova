import type { TSlashNotation } from './slash-notation.type.ts';

export type TParseSeparatorFn<
  PartFirst extends string = string,
  Separator extends string = '/',
  PartSecond extends string = string
> = (
  value: TSlashNotation<PartFirst, Separator, PartSecond>
) => Separator | undefined;
