import Dexie from "dexie";
import type { TMessagesDB } from "./types/TMessagesDB.type";
import type { IMessage } from "./types/IMessage.interface";

class __MessagesDB extends Dexie {
  messages!: TMessagesDB["messages"];
  constructor() {
    super("MessagesDatabase");
    this.version(1).stores({
      messages: "++id, [chatId+id]",
    });
  }

  async removeMessage({ id }: Pick<IMessage, "id">) {
    return await this.messages.delete(id);
  }
  async createMessage({ chatId, content, role }: Omit<IMessage, "id">) {
    return await this.messages.add({ chatId, content, role });
  }
  async getChatMessages({ chatId }: { chatId: IMessage["chatId"] | string }) {
    if (typeof chatId === "string") chatId = Number(chatId);
    return await this.messages.where("chatId").equals(chatId).toArray();
  }
}

export const MessagesDB = new __MessagesDB();
