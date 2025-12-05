import Dexie from "dexie";
import type { TMessagesDB } from "./types/TMessagesDB.type";
import type { IMessage } from "./types/IMessage.interface";
import type { IHistoryItem } from "@shared/api/ai/aiAbstract/types/history.interface";

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
      .and((msg) => msg.role === "user")
      .first();
  }
  async setProcessed({
    id,

    processed,
  }: Pick<IMessage, "id" | "processed">) {
    return await this.messages.update(id, { processed });
  }
  async getChatHistory<Key extends string = "content">({
    chatId,
    key,
  }: Pick<IMessage, "chatId"> & { key: Key }): Promise<IHistoryItem<Key>[]> {
    const messages = await MessagesDB.messages
      .where("chatId")
      .equals(chatId)
      .toArray();

    return messages.map((msg) => ({
      role: msg.role === "assistent" ? "assistant" : msg.role,
      [key]: msg.content,
    })) as IHistoryItem<Key>[];
  }
}

export const MessagesDB = new __MessagesDB();
