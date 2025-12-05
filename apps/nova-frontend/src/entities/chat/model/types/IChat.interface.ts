import type { TAiUrl } from "@shared/api/ai/lib/formatModel/types/metaSourceAndModel.type";
import type { TId } from "./TId.type";

export interface IChat {
  id: TId;
  url: TAiUrl;
  preview: string;
}
