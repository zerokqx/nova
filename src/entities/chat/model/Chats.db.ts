import { Dexie } from "dexie";
import type { IChat } from "./types/IChat.interface";
import type { TChatsDB } from "./types/IChatsDB.type";

class __ChatsDB extends Dexie {
  chats!: TChatsDB["chats"];
  messages!: TChatsDB["messages"];
  constructor() {
    super("ChatDatabase");
    this.version(1).stores({
      chats: "++id",
      messages: "++id, [chatId+id]",
    });
  }
  async createChat({ model, preview }: Omit<IChat, "id">) {
    await this.chats.add({ model, preview });
  }
  async deleteChat(id: IChat["id"]) {
    await this.chats.delete(id);
  }
  async getAllChats() {
    return await this.chats.toArray();
  }
}
export const ChatsDB = new __ChatsDB();
