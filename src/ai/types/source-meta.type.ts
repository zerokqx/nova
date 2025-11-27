import type { TModels } from "./source-models.type";

export interface IMeta<M extends TModels> {
  name: string;
  humanRedableName: string;
  version?: string;
  withThinking: Record<M[number], boolean>;
}
