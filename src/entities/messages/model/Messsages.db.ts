import Dexie from "dexie";
import type { TMessagesDB } from "./types/TMessagesDB.type";
import type { IMessage } from "./types/IMessage.interface";
import { providers } from "@shared/api/ai/container";

class __MessagesDB extends Dexie {
  messages!: TMessagesDB["messages"];
  constructor() {
    super("MessagesDatabase");
    this.version(1).stores({
      messages: "++id,[chatId+initialize],initialize,  [chatId+id]",
    });
  }

  async removeMessage({ id }: Pick<IMessage, "id">) {
    return await this.messages.delete(id);
  }
  async createMessage({
    chatId,
    content,
    processed,
    role,
    initialize,
  }: Omit<IMessage, "id">) {
    return await this.messages.add({
      processed: processed ?? false,
      chatId,
      content,
      role,
      initialize: initialize ?? false,
    });
  }
  async getChatMessages({ chatId }: { chatId: IMessage["chatId"] | string }) {
    if (typeof chatId === "string") chatId = Number(chatId);
    return await this.messages.where("chatId").equals(chatId).toArray();
  }
  async getInitMessage({ chatId }: Pick<IMessage, "chatId">) {
    return await this.messages
      .where("chatId")
      .equals(chatId)
      .and((msg) => msg.initialize === true)
      .first();
  }
  async setProcessed({
    id,

    processed,
  }: Pick<IMessage, "id" | "processed">) {
    return await this.messages.update(id, { processed });
  }
}

export const MessagesDB = new __MessagesDB();
