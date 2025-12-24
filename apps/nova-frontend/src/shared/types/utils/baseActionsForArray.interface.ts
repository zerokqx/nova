import type { ArrayElement } from "type-fest";
import type { Fn } from "../functions/fn.type";
export interface IBaseActionForArray<M extends unknown[]> {
  doHas: Fn<[ArrayElement<M>], boolean>;
  doLength: Fn<[], number>;
  doPush: Fn<[M[number]], void>;
  doPop: Fn<[], M[number]>;
}
