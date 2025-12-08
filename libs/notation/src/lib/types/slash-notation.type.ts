/**
 * Тип для типизации нотации
 */
export type TSlashNotation<
  PartFirst extends string,
  Separator extends string,
  PartSecond extends string
> = `${PartFirst}${Separator}${PartSecond}`;

export type TBeforeSplit<
  PartFirst extends string,
  PartSecond extends string
> = [PartFirst, PartSecond];
