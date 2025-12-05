import Perplexity from "@perplexity-ai/perplexity_ai";
import { AiSourceAbstact } from "../aiAbstract";
import type { IMetaClass } from "../utils/meta/types/meta.interface";
import type { ISourceReturn } from "../aiAbstract/types/sourceReturn.interface";
import type { ISourceChatCreate } from "../aiAbstract/types/sourceChat.interface";
import type { ISourceWithFunctionParametres } from "../aiAbstract/types/sourceWith.interface";
export class AiSourcePerplexity extends AiSourceAbstact {
  private ai: Perplexity;
  constructor(public meta: IMetaClass) {
    super();
    console.log(this.api);
    this.ai = new Perplexity({ apiKey: this.api });
  }
  createChat(model: "sonar"): ISourceChatCreate {
    return null;
  }
  with({ apiKey }: ISourceWithFunctionParametres): this {
    this.api = apiKey;
    return this;
  }
  async sendMessageStream(content: string, model = this.meta.defaultModel) {
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

  async sendMessage(
    content: string,
    model = this.meta.defaultModel,
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
