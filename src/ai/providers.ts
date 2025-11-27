import type { AiSourceAbstact } from "./ai-class.abstract";
import { AiSourceGenai } from "./ai-genai";
import { AiSourcePerplexity } from "./ai-perplexity";

type TProviderClass = (new (api: string) => AiSourceAbstact<unknown[]>) & {
  providerName: string;
};
export type TProviders = Record<string, TProviderClass>;

export class Providers {
  static providers: TProviders = {};

  static register(ProviderClass: TProviderClass) {
    const providerName = ProviderClass.providerName;
    this.providers[providerName] = ProviderClass;
    return this;
  }
  static getProvider(key: string): TProviderClass | undefined {
    return this.providers[key];
  }
  static getInitialized(
    key: string,
    api: string,
  ): AiSourceAbstact<unknown[]> | undefined {
    const provider = this.providers[key];
    if (provider) {
      return new provider(api);
    }
  }
  static getNames() {
    return Object.keys(this.providers);
  }
}

Providers.register(AiSourceGenai).register(AiSourcePerplexity);
