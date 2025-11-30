import type { TSymbol } from "./types/typedSymbol";

export const typedSymbol = <D extends string>(description: D): TSymbol<D> =>
  Symbol(description) as TSymbol<D>;
