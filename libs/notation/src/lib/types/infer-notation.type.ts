export type TInfer<O extends object, K extends keyof O> = O[K] extends (
  ...args: any[]
) => any
  ? ReturnType<O[K]>
  : never;

export type TInferSep<T extends { inferSep: () => string }> = TInfer<
  T,
  'inferSep'
>;
export type TInferNotation<T extends { inferNotation: () => string }> = TInfer<
  T,
  'inferNotation'
>;
