import { IMessage } from './message.interface';
import { ModelMessage, type LanguageModel } from 'ai';

import { ProviderV2 } from '@ai-sdk/provider';
export interface IDataGenerateText {
  model: LanguageModel;
  prompt: string | ModelMessage[];
}
