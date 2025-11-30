import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import type { TSources } from "@shared/api/ai/types/sources.type";

export type TSourceAndModel = `${TSources}/${TModels[number]}`;
