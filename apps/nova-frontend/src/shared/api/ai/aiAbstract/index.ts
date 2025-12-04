import type { IMetaClass } from "../utils/meta/types/meta.interface";
import type { IHistoryItem } from "./types/history.interface";
import type { TModels } from "./types/models.type";
import type { ISourceChatCreate } from "./types/sourceChat.interface";
import type { ISourceReturn } from "./types/sourceReturn.interface";
import type { ISourceWithFunctionParametres } from "./types/sourceWith.interface";

export abstract class AiSourceAbstact {
  abstract meta: IMetaClass;
  private _api?: string = "";

  hash(): number {
    return Math.random();
  }
  get api(): string | undefined {
    return this._api;
  }
  set api(value: string) {
    this._api = value;
  }

  abstract with({ apiKey }: ISourceWithFunctionParametres): this;
  abstract sendMessageStream(
    content: string,
    model: TModels[number],
  ): Promise<AsyncGenerator<{ text: string | undefined }, unknown, unknown>>;
  abstract createChat(model: TModels[number]): ISourceChatCreate;
  abstract sendMessage<T extends string = "content">(
    content: string | IHistoryItem<T>[],
    model?: TModels[number],
  ): Promise<ISourceReturn>;
}
