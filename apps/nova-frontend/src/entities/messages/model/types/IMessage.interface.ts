import type { TId } from "@entities/chat/@x/messages";

export interface IMessage {
  id: TId;
  role: "assistent" | "user";
  chatId: TId;
  initialize?: boolean;
  processed?: boolean;
  content: string;
}
