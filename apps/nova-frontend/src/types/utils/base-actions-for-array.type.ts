import type { Fn } from "@t/functions/fn.type";

import type { ArrayElement } from "type-fest";
export interface IBaseActionForArray<M extends unknown[]> {
  doHas: Fn<[ArrayElement<M>], boolean>;
  doLength: Fn<[], number>;
  doPush: Fn<[M[number]], void>;
  doPop: Fn<[], M[number]>;
}
