import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import type { TSources } from "@shared/api/ai/types/sources.type";

/**
 * Тип для создания строки `TSource/TModels[number]`
 */
export type TAiUrl = `${TSources}${TAiUrlSeparator}${TModels[number]}`;
export type TAiUrlSeparator = "/";
