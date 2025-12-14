import { useChat } from '@ai-sdk/react';
import { TNotation } from '@shared/lib/utils/notation';
import { DefaultChatTransport } from 'ai';
export const useSendMessage = (notation: TNotation) => {
  const chat = useChat({
    transport: new DefaultChatTransport({
      api: 'http://localhost:3000/api' + `/ai/${notation}/stream`,
    }),
  });
  return chat;
};
