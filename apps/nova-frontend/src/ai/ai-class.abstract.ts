import type { ISourceChatCreate } from "./types/source-chat.type";
import type { IMeta } from "./types/source-meta.type";
import type { TModels } from "./types/source-models.type";
import type { ISourceReturn } from "./types/source-return.type";
export abstract class AiSourceAbstact<M extends TModels> {
  public meta: IMeta<M> | null = null;
  public models: M;

  private _api?: string;

  constructor(models: M, meta?: IMeta<M>, api?: string) {
    this.models = models;
    if (meta) this.meta = meta;
    if (api) this._api = api;
    console.log(meta);
  }

  hash(): number {
    return Math.random();
  }
  get api(): string | undefined {
    return this._api;
  }

  abstract sendMessageStream(
    content: string,
    model: M[number],
  ): Promise<AsyncGenerator<{ text: string | undefined }, unknown, unknown>>;
  abstract createChat(model: M[number]): ISourceChatCreate;
  abstract sendMessage(
    content: string,
    model?: M[number],
  ): Promise<ISourceReturn>;
  abstract get defaultModel(): M[number];
}
