import { Injectable } from '@nestjs/common';
import {
  AssistantModelMessage,
  GenerateTextResult,
  generateText as gText,
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
}
