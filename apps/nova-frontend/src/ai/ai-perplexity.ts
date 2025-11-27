import { AiSourceAbstact } from "./ai-class.abstract";
import type { ISourceChatCreate } from "./types/source-chat.type";
import type { ISourceReturn } from "./types/source-return.type";

import Perplexity from "@perplexity-ai/perplexity_ai";
export class AiSourcePerplexity extends AiSourceAbstact<["sonar"]> {
  private ai: Perplexity;
  constructor(api: string) {
    super(
      ["sonar"],
      {
        humanRedableName: "Perplexity",
        name: "perplexity",
        version: "1.0",
        withThinking: {
          sonar: false,
        },
      },
      api,
    );
    this.ai = new Perplexity({ apiKey: this.api });
  }
  createChat(model: "sonar"): ISourceChatCreate {
    return null;
  }
  async sendMessageStream(content: string, model = this.defaultModel) {
    const response = await this.ai.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content,
        },
      ],
      stream: true,
    });

    async function* generator() {
      for await (const chunk of response) {
        yield { text: chunk.choices[0]?.delta.content.toString() };
      }
    }
    return generator();
  }
  get defaultModel(): "sonar" {
    return this.models[0];
  }
  async sendMessage(
    content: string,
    model = this.defaultModel,
  ): Promise<ISourceReturn> {
    const response = this.ai.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });
    return {
      data: {
        content: (await response).choices[0].message.content.toString(),
      },
    };
  }
}
