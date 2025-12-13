import { Injectable } from '@nestjs/common';
import {
  AssistantModelMessage,
  GenerateTextResult,
  generateText as gText,
  streamText,
  ToolSet,
} from 'ai';

import { IDataGenerateText } from './types/ai.utils.types';

/**
 * Утилитарный класс для провайдеров
 */
@Injectable()
export class AiUtils {
  async generateText({
    model,
    prompt,
  }: IDataGenerateText): Promise<GenerateTextResult<ToolSet, never>> {
    return await gText({
      model,
      prompt,
    });
  }

  convertToAistantMessage(
    result: GenerateTextResult<ToolSet, never>
  ): AssistantModelMessage {
    return {
      content: result.text,
      role: 'assistant',
    };
  }

  gStream({ model, prompt }: IDataGenerateText) {
    return streamText({
      model,
      prompt,
    });
  }
  async generateStream(data: IDataGenerateText) {
    return this.gStream(data).toUIMessageStreamResponse();
  }

  async generateStreamNest(data: IDataGenerateText, res: Response) {
    return this.gStream(data).pipeUIMessageStreamToResponse(res);
  }
}
