import type { AiSourceAbstact } from "@shared/api/ai/aiAbstract";
import type { TMetaSources } from "@shared/api/ai/utils/meta/types/metaSources.type";
import type { Fn } from "@shared/types/functions/fn.type";

export type TGetByMetaNameFn = Fn<[TMetaSources], AiSourceAbstact>;
