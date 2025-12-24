import type { Fn } from "@shared/types/functions/fn.type";
import type { TLogotypeWidth } from "./LogotypeWidth.type";

export interface ILogotypeIcon {
  width?: TLogotypeWidth;
  animate?: boolean;
  onClick?: Fn;
}
