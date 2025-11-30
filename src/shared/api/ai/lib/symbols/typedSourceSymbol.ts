import type { TSources } from "../../types/sources.type";
import { typedSymbol } from "./typedSymbol";

export const typeSourceSymbol = <D extends TSources>(description: D) =>
  typedSymbol<D>(description);
