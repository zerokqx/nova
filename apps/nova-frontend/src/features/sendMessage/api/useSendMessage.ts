import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';
import { useMemo } from 'react';
export const useSendMessage = (
  url: string,
  id: string,
  messages?: UIMessage[]
) => {
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `http://localhost:3000/api/ai/${url}/stream`,
      }),
    [url]
  );

  const chat = useChat({
    id,
    transport,
    messages,
  });

  return chat;
};
