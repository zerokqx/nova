import type { TSources } from "../../types/sources.type";
import type { TMetaSources } from "../../utils/meta/types/metaSources.type";
import { typedMetaSymbol } from "./typedMetaSymbol";
import { typedSymbol } from "./typedSymbol";
import type { TSymbol } from "./types/typedSymbol";

export const AI: Record<TSources, TSymbol<TSources>> = {
  Gemini: typedSymbol("Gemini"),
  Perplexity: typedSymbol("Perplexity"),
} as const;

export const AIMETA: Record<
  TMetaSources,
  ReturnType<typeof typedMetaSymbol>
> = {
  GeminiMeta: typedMetaSymbol(),
  PerplexityMeta: typedMetaSymbol(),
} as const;
