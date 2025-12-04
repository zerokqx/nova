import { Dexie } from "dexie";
import type { IChat } from "./types/IChat.interface";
import type { TChatsDB } from "./types/IChatsDB.type";

class __ChatsDB extends Dexie {
  chats!: TChatsDB["chats"];
  constructor() {
    super("ChatDatabase");
    this.version(1).stores({
      chats: "++id",
    });
  }
  async createChat({ url, preview }: Omit<IChat, "id">) {
    const previewSlice = preview.slice(0, 20);
    return await this.chats.add({ url, preview: `${previewSlice}...` });
  }
  async deleteChat(id: IChat["id"]) {
    return await this.chats.delete(id);
  }
  async getAllChats() {
    return await this.chats.toArray();
  }
}
export const ChatsDB = new __ChatsDB();
