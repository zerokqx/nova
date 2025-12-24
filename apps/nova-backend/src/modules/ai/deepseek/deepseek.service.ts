import {
  AssistantModelMessage,
  StreamTextResult,
  ToolSet,
  ModelMessage,
  streamText,
} from 'ai';
import { AiProvider } from '../ai.abstract';
import { DeepSeekProvider, createDeepSeek } from '@ai-sdk/deepseek';
import { AiUtils } from '../ai.utils';
export class DeepSeekService extends AiProvider<DeepSeekProvider> {
  protected override client: DeepSeekProvider;
  constructor(private utils: AiUtils) {
    super();
  }
  override async send(
    prompt: string,
    model: string,
  ): Promise<AssistantModelMessage> {
    const client = this.sendGuard();
    const data = await this.utils.generateText({
      prompt,
      model: client(model),
    });
    return this.utils.convertToAistantMessage(data);
  }
  protected override _createClient(apiKey: string): DeepSeekProvider {
    return createDeepSeek({
      apiKey,
    });
  }
  stream(prompt: string, model: string): StreamTextResult<ToolSet, never> {
    const client = this.sendGuard();
    return this.utils.gStream({ prompt, model: client(model) });
  }
  streamWithMessagesArray(
    messages: ModelMessage[],
    model: string,
  ): StreamTextResult<ToolSet, never> {
    const client = this.sendGuard();
    return streamText({
      model: client(model),
      messages,
    });
  }
}
