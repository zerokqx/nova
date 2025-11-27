import type { Fn } from "@t/functions/fn.type";

export type TUseApiKeyStore = Record<string, string>;
export interface IUseApiKeyActions {
  doNewApiKey: Fn<[key: string, value: string], void>;
  doHasApiKey: Fn<[key: string], boolean>;
  doPutchApiKey: Fn<[key: string, value: string], void>;
  doRemoveApi: Fn<[key: string], void>;
}
