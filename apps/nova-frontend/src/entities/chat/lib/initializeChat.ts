import { ChatsDB } from "../model";
import type { TInitializeChatFn } from "./types/initializeChat.types";
import { MessagesDB } from "@entities/messages";

export const initializeChat: TInitializeChatFn = async ({
  content,
  url,
  preview,
  role,
}) => {
  const chat = await ChatsDB.createChat({ url, preview });
  const message = await MessagesDB.createMessage({
    chatId: chat,
    content,
    initialize: true,
    role,
  });

  return [chat, message];
};
