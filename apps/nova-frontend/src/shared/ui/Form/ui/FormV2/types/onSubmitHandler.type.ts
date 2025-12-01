import type { Fn } from "@shared/types/functions/fn.type";

export type TOnSubmitHandlerForm<T extends object> = Fn<[{ value: T }], void>;
