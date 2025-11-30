import type { EntityTable } from "dexie";
import type Dexie from "dexie";
import type { IMessage } from "./IMessage.interface";

export type TMessagesDB = Dexie & {
  messages: EntityTable<IMessage, "id">;
};
