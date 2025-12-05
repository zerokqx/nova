import type { AiSourceAbstact } from "../aiAbstract";
import type { typedMetaSymbol } from "../lib/symbols/typedMetaSymbol";
import type { TSymbol } from "../lib/symbols/types/typedSymbol";
import type { IMetaClass } from "../utils/meta/types/meta.interface";
import type { TSources } from "./sources.type";

export type TBindingMap = Record<TSymbol<TSources>, AiSourceAbstact> &
  Record<ReturnType<typeof typedMetaSymbol>, IMetaClass>;
