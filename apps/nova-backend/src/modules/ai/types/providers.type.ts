import { TSlashNotation } from '@nova/notation';

export const PROVIDERS = ['perplexity', 'gemini'] as const;
export const PROVIDERS_MODELS = {
  gemini: ['gemini-2.5-flash', 'gemini-2.5-pro'],
  perplexity: ['sonar'],
} as const;

export type TProviders = (typeof PROVIDERS)[number];
export type TProviderModelsNotation = TSlashNotation<
  keyof typeof PROVIDERS_MODELS,
  '/',
  (typeof PROVIDERS_MODELS)[keyof typeof PROVIDERS_MODELS][number]
>;
