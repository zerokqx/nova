import { Injectable } from '@nestjs/common';
import { AiProvider } from '../ai.abstract';
import { type PerplexityProvider, createPerplexity } from '@ai-sdk/perplexity';
import { AiUtils } from '../ai.utils';

@Injectable()
export class PerplexityService extends AiProvider<PerplexityProvider> {
  protected override client!: PerplexityProvider;
  constructor(private utils: AiUtils) {
    super();
  }
  override async send(prompt: string, model: string) {
    const client = this.sendGuard();
    const data = await this.utils.generateText({
      prompt,
      model: client(model),
    });
    return this.utils.convertToAistantMessage(data);
  }
  protected override _createClient(apiKey: string) {
    return createPerplexity({
      apiKey,
    });
  }
}
