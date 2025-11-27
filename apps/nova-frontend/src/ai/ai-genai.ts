import { GoogleGenAI } from "@google/genai";
import { AiSourceAbstact } from "./ai-class.abstract";
import type { ISourceReturn } from "./types/source-return.type";
import type { ISourceChatCreate } from "./types/source-chat.type";
import { Providers } from "./providers";

export class AiSourceGenai extends AiSourceAbstact<
  ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-flash-lite"]
> {
  static providerName = "Gemini";
  private ai: GoogleGenAI;
  constructor(api: string) {
    super(["gemini-2.5-flash", "gemini-2.5-pro", "gemini-flash-lite"], {
      withThinking: {
        "gemini-flash-lite": false,
        "gemini-2.5-flash": false,
        "gemini-2.5-pro": true,
      },
      name: "genai",
      humanRedableName: "Gemini(GoogleGenAi)",
      version: "1.0",
    });

    this.ai = new GoogleGenAI({ apiKey: api });
  }
  async sendMessageStream(
    content: string,

    model: (typeof this.models)[number] = this.defaultModel,
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
    model: (typeof this.models)[number] = this.defaultModel,
  ): ISourceChatCreate {
    const chat = this.ai.chats.create({ model });
    return {
      sendMessage: async (message) => {
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
    return this.models[0];
  }
  async sendMessage(
    content: string,
    model = this.defaultModel,
  ): Promise<ISourceReturn> {
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
