import { Conversation, ConversationContent } from '@/components/ai-elements/conversation';
import { motion } from 'motion/react';
import { MessageContent, Message, MessageResponse } from '@/components/ai-elements/message';
import { AskModelPromptForm } from '@/features/ask-model';
import { doGetInitMessage } from '@/features/messages/model/intializeMessageStore';
import { useSendMessage } from '@features/sendMessage';
import { AppShellMain, Stack, Center, useMantineTheme } from '@mantine/core';
import { useAdaptiveSpace } from '@shared/lib/hooks/useAdaptiveSpace';
import { getRouteApi, useParams } from '@tanstack/react-router';
import { UIMessage } from 'ai';
import { map } from 'lodash';
import { useEffect, useRef } from 'react';
import { HashLoader } from 'react-spinners';
import { AnimatedRoute } from '@/shared/ui/animated-route';
import { useLogger } from '@mantine/hooks';
import { useSuspenseSelect } from '@/features/chats/api/select-chat';

export function Chat() {
  const initSend = useRef(false);
  const { id } = useParams({ from: '/chat/$id' });

  const { data, refetch, isLoading, isFetching } = useSuspenseSelect(id);
  useLogger('DATA', [data]);
  const t = useMantineTheme();
  const { sendMessage, status, messages, stop } = useSendMessage(
    data?.provider ?? '',
    data?.id ?? '',
    data?.messages as UIMessage[],
  );
  useLogger('FETCH', [isFetching]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [ref, Space] = useAdaptiveSpace();

  useEffect(() => {
    if (isFetching) return;
    if (data?.messages?.length === 0 && !initSend.current) {
      sendMessage({ text: doGetInitMessage() });
      initSend.current = true;
    }
  }, [id, data?.messages?.length, isFetching, sendMessage]);
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
                <ConversationContent style={{ overflowX: 'hidden' }}>
                  {messages &&
                    map(messages, ({ parts, role, id }) => (
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
              // if (data?.id) {
              //   queryClient.invalidateQueries({
              //     ...$apiOpt(
              //       'get',
              //       '/api/chats/select/{id}',
              //       {
              //         params: { path: { id: data.id } },
              //       },
              //       { refetchOnMount: 'always' },
              //     ),
              //
              //     refetchType: 'none',
              //   });
              // }
            }}
          />
        </Center>
      </AppShellMain>
    </AnimatedRoute>
  );
}
