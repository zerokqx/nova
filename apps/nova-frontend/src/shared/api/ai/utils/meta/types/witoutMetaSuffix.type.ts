import type { TSources } from "@shared/api/ai/types/sources.type";
import type { Fn } from "@shared/types/functions/fn.type";
import type { TMetaSources } from "./metaSources.type";

export type TWithoutMetaSuffixFn = Fn<[TMetaSources], TSources>;
