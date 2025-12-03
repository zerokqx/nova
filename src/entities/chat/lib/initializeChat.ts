import { ChatsDB } from "../model";
import type { TInitializeChatFn } from "./types/initializeChat.types";
import { MessagesDB } from "@entities/messages";

export const initializeChat: TInitializeChatFn = async ({
  content,
  model,
  preview,
  role,
}) => {
  const chat = await ChatsDB.createChat({ model, preview });
  const message = await MessagesDB.createMessage({
    chatId: chat,
    content,
    initialize: true,
    role,
  });

  return [chat, message];
};
