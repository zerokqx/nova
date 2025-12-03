import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import type { TSources } from "@shared/api/ai/types/sources.type";

/**
 * Тип для создания строки `TSource/TModels[number]`
 */
export type TSourceAndModel =
  `${TSources}${TSlashNotationSeparator}${TModels[number]}`;
export type TSlashNotationSeparator = "/";
