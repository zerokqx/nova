import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import type { TSources } from "@shared/api/ai/types/sources.type";

export interface IMetaClass {
  readonly providerName: TSources;
  readonly models: TModels;
  readonly thinking: boolean;
  readonly defaultModel: TModels[number];
}
