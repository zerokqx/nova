import type { IChat } from "@entities/chat/model";
import type { IMessage } from "@entities/messages/@x/chat";
import type { Fn } from "@shared/types/functions/fn.type";
import type { Asyncify } from "type-fest";

export interface IInitializeData
  extends Omit<IChat, "id">,
    Omit<IMessage, "id" | "initialize" | "chatId"> {}

export type TInitializeChatFn = Asyncify<
  Fn<[IInitializeData], Promise<[number, number]>>
>;
