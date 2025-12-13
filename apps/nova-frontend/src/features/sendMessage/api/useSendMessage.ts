import { useChat } from '@ai-sdk/react';
import { API_URL } from '@shared/api/client';
import { TNotation } from '@shared/lib/utils/notation';
import { DefaultChatTransport } from 'ai';
export const useSendMessage = (notation: TNotation) => {
  const chat = useChat({
    transport: new DefaultChatTransport({
      api: API_URL + `/ai/${notation}/stream`,
    }),
  });
  return chat;
};
