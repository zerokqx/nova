import type { Fn } from "@shared/types/functions/fn.type";
import type { ReactElement, ReactNode, RefObject } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TUseAdaptiveSpace = Fn<[], [RefObject<any>, () => ReactNode]>;
