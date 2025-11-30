import type { TId } from "@entities/chat/@x/messages";

export interface IMessage {
  id: TId;
  role: string;
  chatId: TId;
  content: string;
}
