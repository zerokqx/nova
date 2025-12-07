export type TInferSep<T extends { inferSep: () => string }> = ReturnType<
  T['inferSep']
>;
