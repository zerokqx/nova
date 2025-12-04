import { GoogleGenAI } from "@google/genai";
import { injectable } from "inversify";
import { AiSourceAbstact } from "../aiAbstract";
import type { IMetaClass } from "../utils/meta/types/meta.interface";
import type { ISourceReturn } from "../aiAbstract/types/sourceReturn.interface";
import type { TModels } from "../aiAbstract/types/models.type";
import type { ISourceChatCreate } from "../aiAbstract/types/sourceChat.interface";
import type { ISourceWithFunctionParametres } from "../aiAbstract/types/sourceWith.interface";
import type { IHistoryItem } from "../aiAbstract/types/history.interface";

@injectable()
export class AiSourceGemini extends AiSourceAbstact {
  private ai: GoogleGenAI;

  constructor(public meta: IMetaClass) {
    super();
    this.ai = new GoogleGenAI({ apiKey: this.api });
  }

  with({ apiKey }: ISourceWithFunctionParametres): this {
    this.api = apiKey;
    this.ai = new GoogleGenAI({ apiKey: this.api }); // Пересоздаем клиент
    return this;
  }
  async sendMessageStream(
    content: string,

    model: TModels[number] = this.defaultModel,
  ) {
    const response = await this.ai.models.generateContentStream({
      contents: content,
      model,
    });

    async function* generator() {
      for await (const chunk of response) {
        yield { text: chunk.text };
      }
    }

    return generator();
  }

  createChat(
    model: (typeof this.meta.models)[number] = this.defaultModel,
  ): ISourceChatCreate {
    const chat = this.ai.chats.create({ model });
    return {
      sendMessage: async (message: string) => {
        const response = await chat.sendMessage({ message });
        return {
          data: {
            content: response.text,
          },
        };
      },
    };
  }
  get defaultModel() {
    return this.meta.models[0];
  }
  async sendMessage<Key extends string = "text">(
    content: string | IHistoryItem<Key>[],
    model = this.defaultModel,
  ): Promise<ISourceReturn> {
    console.log(this.api);
    const response = await this.ai.models.generateContent({
      model,
      contents: content,
    });

    return {
      data: {
        content: response.text,
      },
    };
  }
}
