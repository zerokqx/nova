import type { Fn } from "@shared/types/functions/fn.type";
import type { TSources } from "../../types/sources.type";

type Value = TSources;
export type TUseAiProvidersStore = Value[];
export interface IUseAiProvidersAction {
  doAdd: Fn<[value: Value]>;
  doRemove: Fn<[value: Value]>;
  doHas: Fn<[value: Value], boolean>;
}
