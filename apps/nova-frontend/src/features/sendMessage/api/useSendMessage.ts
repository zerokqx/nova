import { useChat } from '@ai-sdk/react';
import { TNotation } from '@shared/lib/utils/notation';
import { DefaultChatTransport, HttpChatTransport } from 'ai';
import { useMemo } from 'react';
export const useSendMessage = (notation: TNotation) => {
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `http://localhost:3000/api/ai/${notation}/stream`,
      }),
    [notation]
  );
  const chat = useChat({
    id: 'dw',

    transport,
  });
  return chat;
};
