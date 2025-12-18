import {
  Conversation,
  ConversationContent,
} from '@/components/ai-elements/conversation';
import {
  MessageContent,
  Message,
  MessageResponse,
} from '@/components/ai-elements/message';
import { AskModelPromptForm } from '@/features/ask-model';
import { useSelectChat } from '@/features/chats/api/select-chat';
import { doGetInitMessage } from '@/features/messages/model/intializeMessageStore';
import { useSendMessage } from '@features/sendMessage';
import { AppShellMain, Stack, Center, useMantineTheme } from '@mantine/core';
import { useAdaptiveSpace } from '@shared/lib/hooks/useAdaptiveSpace';
import { getRouteApi, useParams } from '@tanstack/react-router';
import { UIMessage } from 'ai';
import { map } from 'lodash';
import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';
import { HashLoader } from 'react-spinners';
export function Chat() {
  const initSend = useRef(false);
  const routeApi = getRouteApi('/chat/$id');
  const data = routeApi.useLoaderData().data;
  const { id } = useParams({
    from: '/chat/$id',
  });

  const t = useMantineTheme();
  const { sendMessage, status, messages, stop } = useSendMessage(
    data?.provider ?? '',
    data?.id ?? '',
    data?.messages as UIMessage[]
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [ref, Space] = useAdaptiveSpace();
  useEffect(() => {
    console.log(data);
    if (data?.messages.length === 0 && !initSend.current) {
      console.log(doGetInitMessage());
      sendMessage({ text: doGetInitMessage() });
      initSend.current = true;
    }
  }, [data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <AppShellMain>
      <Center>
        <Stack w={{ base: '100%', sm: '20%' }}>
          {messages.length > 0 && (
            <Conversation>
              <ConversationContent>
                {messages &&
                  map(messages, ({ parts, role, id }, messageIndex) => (
                    <Message from={role} key={nanoid(4)}>
                      <MessageContent>
                        {parts?.map(
                          (part) => part.type === 'text' && part.text
                        )}
                      </MessageContent>
                    </Message>
                  ))}
                {status === 'submitted' && (
                  <Message from="assistant">
                    <MessageContent className="p-5">
                      <HashLoader color={t.colors.blue[8]} size={16} />
                    </MessageContent>
                  </Message>
                )}
              </ConversationContent>
            </Conversation>
          )}
          <Space />
        </Stack>
      </Center>

      <div ref={messagesEndRef} />
      <Center
        ref={ref}
        pos="fixed"
        bottom={0}
        p={'md'}
        left={0}
        right={0}
        style={{
          transition: 'padding ease 0.1s',
          paddingLeft: 'var(--app-shell-navbar-offset, --mantine-spacing-md)',
          paddingRight: 'var(--app-shell-aside-offset, --mantine-spacing-md)',
          zIndex: 0,
        }}
        w="100%"
      >
        <AskModelPromptForm
          callbacks={{ stop }}
          status={status}
          withSelect={false}
          onSubmit={async ({ value }) => {
            sendMessage(value);
          }}
        />
      </Center>
    </AppShellMain>
  );
}
