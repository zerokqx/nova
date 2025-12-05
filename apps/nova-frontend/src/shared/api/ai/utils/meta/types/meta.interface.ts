import type { TModels } from '@shared/api/ai/aiAbstract/types/models.type';
import type { ITransformModel } from '@shared/api/ai/lib/formatModel/types/transform.type';
import type { TSources } from '@shared/api/ai/types/sources.type';

export interface IMetaClass {
  readonly providerName: TSources;
  readonly models: TModels;
  readonly systemPrompt?: string[];
  readonly contentKeyHistory: string;
  readonly thinking: boolean;
  readonly defaultModel: TModels[number];
  readonly _slashNotation?: ITransformModel;
  readonly slash?: ITransformModel;
}
