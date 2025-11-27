import type { Fn } from "../../types/functions/fn.type";
import type { ISourceReturn } from "./source-return.type";

export interface ISourceChatCreate {
  sendMessage: Fn<[string], Promise<ISourceReturn>>;
}
