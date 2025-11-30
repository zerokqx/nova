import type { Fn } from "@shared/types/functions/fn.type";
import type { TSourceAndModel } from "./metaSourceAndModel.type";
import type { TSources } from "@shared/api/ai/types/sources.type";
import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";

export type TAfterSplit = [source: TSources, model: TModels[number]];
export interface IDeSlashNotationReturn {
  model: string;
  source: string;
}
export type TDeSlashNotatonFn = Fn<[TSourceAndModel], IDeSlashNotationReturn>;
