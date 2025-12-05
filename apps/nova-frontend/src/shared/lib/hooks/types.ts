import type { Fn } from "@shared/types/functions/fn.type";
import type { ReactElement, ReactNode, RefObject } from "react";

export type TUseAdaptiveSpace = Fn<
  [],
  [RefObject<any>, () => ReactNode, { height: number; width: number }]
>;
