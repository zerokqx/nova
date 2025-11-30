import type { AiSourceAbstact } from "@shared/api/ai/aiAbstract";
import type { IMetaClass } from "@shared/api/ai/utils/meta/types/meta.interface";

export interface IGetMetaWithSource {
  source: AiSourceAbstact;
  meta: IMetaClass;
}
