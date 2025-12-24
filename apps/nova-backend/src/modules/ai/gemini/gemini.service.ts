import {
  AssistantModelMessage,
  ToolSet,
  StreamTextResult,
  ModelMessage,
  streamText,
} from 'ai';
import { AiProvider } from '../ai.abstract';
import {
  createGoogleGenerativeAI,
  type GoogleGenerativeAIProvider,
} from '@ai-sdk/google';
import { AiUtils } from '../ai.utils';

export class GeminiService extends AiProvider<GoogleGenerativeAIProvider> {
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
  stream(prompt: string, model: string): StreamTextResult<ToolSet, never> {
    const client = this.sendGuard();
    return this.utils.gStream({ prompt, model: client(model) });
  }
  constructor(private utils: AiUtils) {
    super();
  }
  protected override _createClient(apiKey: string): GoogleGenerativeAIProvider {
    return createGoogleGenerativeAI({
      apiKey,
    });
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
}
