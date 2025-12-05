import type { TSources } from "@shared/api/ai/types/sources.type";
import type { Fn } from "@shared/types/functions/fn.type";

export type Key = TSources;
export type Value = string;
export type TUseApiKeyStore = Partial<Record<Key, Value>>;

export interface IUseApiKeyActions {
  doNewApiKey: Fn<[key: Key, value: Value], void>;
  doHasApiKey: Fn<[key: Key], boolean>;
  doPutchApiKey: Fn<[key: Key, value: Value], void>;
  doRemoveApi: Fn<[key: Key], void>;
  doGetApi: Fn<[key: Key], string | undefined>;
  doKeys: Fn<[], Key[]>;
}
