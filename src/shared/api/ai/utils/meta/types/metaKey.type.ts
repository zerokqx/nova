import type { TSources } from "@shared/api/ai/types/sources.type";
import type { Fn } from "@shared/types/functions/fn.type";

export type TMetaKeyFn = Fn<[TSources], `${TSources}Meta`>;
