import Dexie, { type EntityTable } from "dexie";
import type { IChat } from "./IChat.interface";
import type { IMessage } from "./IMessage.interface";

export type TChatsDB = Dexie & {
  chats: EntityTable<IChat, "id">;
  messages: EntityTable<IMessage, "id">;
};
