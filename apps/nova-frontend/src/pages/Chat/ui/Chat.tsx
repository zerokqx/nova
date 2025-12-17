import {
  MessageContent,
  Message,
  MessageResponse,
} from '@/components/ai-elements/message';
import { AskModelPromptForm } from '@/features/ask-model';
import { useSelectChat } from '@/features/chats/api/select-chat';
import { TNotation } from '@/shared/lib/utils/notation';
import { useSendMessage } from '@features/sendMessage';
import { AppShellMain, Stack, Center, useMantineTheme } from '@mantine/core';
import { useAdaptiveSpace } from '@shared/lib/hooks/useAdaptiveSpace';
import { useParams } from '@tanstack/react-router';
import { lowerCase, map } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { HashLoader } from 'react-spinners';
export function Chat() {
  const { data: messagesChat } = useSelectChat();
  const t = useMantineTheme();
  const [model, setModel] = useState('');
  const { id } = useParams({
    from: '/chat/$id',
  });
  const { sendMessage, status, messages } = useSendMessage(model as TNotation);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [ref, Space] = useAdaptiveSpace();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <AppShellMain>
      <Center>
        <Stack w={{ base: '100%', sm: '50%' }}>
          {messages &&
            map(messages, ({ parts, role, id }) => (
              <Message from={role} key={id}>
                <MessageContent className="  p-5 rounded-3xl">
                  {parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <MessageResponse
                            isAnimating
                            key={`${role}-${i}`}
                            mode="streaming"
                          >
                            {part.text}
                          </MessageResponse>
                        );
                    }
                  })}
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
          <Space />
        </Stack>
      </Center>

      <div ref={messagesEndRef} />
      <Center
        ref={ref}
        pos="fixed"
        bottom={0}
        pb={'md'}
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
          {...{ model, setModel }}
          onSubmit={async (s) => {
            sendMessage(s);
          }}
        />
      </Center>
    </AppShellMain>
  );
}
