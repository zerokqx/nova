import {
  MessageContent,
  Message,
  MessageResponse,
} from '@/components/ai-elements/message';
import { useSendMessage } from '@features/sendMessage';
import { AppShellMain, Stack, Center, Box } from '@mantine/core';
import { useAdaptiveSpace } from '@shared/lib/hooks/useAdaptiveSpace';
import { useParams } from '@tanstack/react-router';
import { AiInput } from '@widgets/AiInput/ui/AiInput';
import { lowerCase, map } from 'lodash';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
export function Chat() {
  const { id, model, provider } = useParams({
    from: '/chat/$id/$provider/$model',
  });
  const { sendMessage, status, messages } = useSendMessage(
    `${lowerCase(provider)}/${model}`
  );

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
                            shikiTheme={['tokyo-night', 'tokyo-night']}
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
        <AiInput
          onSubmit={async ({ value: { content } }) => {
            sendMessage({ text: content });
          }}
          readOnly
          providers={[{ label: model, value: 'model' }]}
        />
      </Center>
    </AppShellMain>
  );
}
