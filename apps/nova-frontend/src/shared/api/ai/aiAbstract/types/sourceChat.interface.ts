import type { Fn } from "@shared/types/functions/fn.type";
import type { ISourceReturn } from "./sourceReturn.interface";

export interface ISourceChatCreate {
  sendMessage: Fn<[string], Promise<ISourceReturn>>;
}
