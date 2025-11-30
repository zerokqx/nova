import Dexie from "dexie";
import type { TMessagesDB } from "./types/TMessagesDB.type";
import type { IMessage } from "./types/IMessage.interface";

class __MessagesDB extends Dexie {
  messages!: TMessagesDB["messages"];
  constructor() {
    super("MessagesDatabase");
    this.version(1).stores({
      messages: "++id, [chatId,id]",
    });
  }

  async createMessage({ chatId, content, role }: Omit<IMessage, "id">) {
    await this.messages.add({ chatId, content, role });
  }
}

export const MessagesDB = new __MessagesDB();
