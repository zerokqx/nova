import Dexie, { type EntityTable } from "dexie";
import type { IChat } from "./IChat.interface";

export type TChatsDB = Dexie & {
  chats: EntityTable<IChat, "id">;
};
