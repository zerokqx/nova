import type { Fn } from "@shared/types/functions/fn.type";
import type { TModels } from "../../aiAbstract/types/models.type";

type Value = TModels;
export type TUseAiProvidersStore = Value[];
export interface IUseAiProvidersAction {
  doAdd: Fn<[value: Value]>;
  doRemove: Fn<[value: Value]>;
  doHas: Fn<[value: Value], boolean>;
}
