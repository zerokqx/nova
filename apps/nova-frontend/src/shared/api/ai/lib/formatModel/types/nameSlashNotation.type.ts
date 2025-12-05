import type { TSources } from "@shared/api/ai/types/sources.type";
import type { Fn } from "@shared/types/functions/fn.type";
import type { TAiUrl } from "./metaSourceAndModel.type";
import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";

export type TNameSlashNotationFn = Fn<
  [TSources, TModels[number]],
  TAiUrl
>;
