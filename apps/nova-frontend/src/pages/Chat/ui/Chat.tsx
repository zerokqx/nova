import { Message } from '@entities/messages';
import { useSendMessage } from '@features/sendMessage';
import { AppShellMain, Stack, Center, Box } from '@mantine/core';
import { useAdaptiveSpace } from '@shared/lib/hooks/useAdaptiveSpace';
import { useParams } from '@tanstack/react-router';
import { AiInput } from '@widgets/AiInput/ui/AiInput';
import { lowerCase, map } from 'lodash';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
const MotionMessage = motion.create(Message);
export function Chat() {
  const { id, model, provider } = useParams({
    from: '/chat/$id/$provider/$model',
  });
  const { sendMessage, messages } = useSendMessage(
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
            map(messages, (message) => (
              <Box w={'100%'} key={message.id}>
                {message.role === 'user' ? 'User: ' : 'AI: '}

                {message.parts.map((part, index) =>
                  part.type === 'text' ? (
                    <span key={index}>{part.text}</span>
                  ) : null
                )}
              </Box>
            ))}
        </Stack>
      </Center>

      <div ref={messagesEndRef} />
      <Space />
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
