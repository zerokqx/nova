import { Conversation, ConversationContent } from '@/components/ai-elements/conversation';
import { motion } from 'motion/react';
import { MessageContent, Message, MessageResponse } from '@/components/ai-elements/message';
import { AskModelPromptForm } from '@/features/ask-model';
import { doGetInitMessage } from '@/features/messages/model/intializeMessageStore';
import { useSendMessage } from '@features/sendMessage';
import { AppShellMain, Stack, Center, useMantineTheme } from '@mantine/core';
import { useAdaptiveSpace } from '@shared/lib/hooks/useAdaptiveSpace';
import { getRouteApi } from '@tanstack/react-router';
import { UIMessage } from 'ai';
import { map } from 'lodash';
import { useEffect, useRef } from 'react';
import { HashLoader } from 'react-spinners';
import { AnimatedRoute } from '@/shared/ui/animated-route';
export function Chat() {
  const initSend = useRef(false);
  const routeApi = getRouteApi('/chat/$id');
  const data = routeApi.useLoaderData().data;
  const t = useMantineTheme();
  const { sendMessage, status, messages, stop } = useSendMessage(
    data?.provider ?? '',
    data?.id ?? '',
    data?.messages as UIMessage[],
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [ref, Space] = useAdaptiveSpace();
  useEffect(() => {
    if (!initSend.current && messages.length === 0) {
      sendMessage({ text: doGetInitMessage() });
      initSend.current = true;
    }
  }, [messages, sendMessage]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <AnimatedRoute variant="blur">
      <AppShellMain>
        <Center>
          <Stack w={{ base: '100%', sm: '50rem' }}>
            {messages.length > 0 && (
              <Conversation>
                <ConversationContent>
                  {messages &&
                    map(messages, ({ parts, role, id }, messageIndex) => (
                      <motion.div
                        initial={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                      >
                        <Message from={role} key={id}>
                          <MessageContent>
                            {parts?.map(
                              (part, i) =>
                                part.type === 'text' && (
                                  <MessageResponse key={`${i}-${id}-${role}`}>
                                    {part.text}
                                  </MessageResponse>
                                ),
                            )}
                          </MessageContent>
                        </Message>
                      </motion.div>
                    ))}
                  {status === 'submitted' && (
                    <Message from="assistant">
                      <Center>
                        <MessageContent className="p-5">
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <HashLoader color={t.colors.blue[8]} size={16} />
                          </motion.div>
                        </MessageContent>
                      </Center>
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
    </AnimatedRoute>
  );
}
