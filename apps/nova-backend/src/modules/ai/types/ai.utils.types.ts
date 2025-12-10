import { ModelMessage, type LanguageModel } from 'ai';

export interface IDataGenerateText {
  model: LanguageModel;
  prompt: string | ModelMessage[];
}
