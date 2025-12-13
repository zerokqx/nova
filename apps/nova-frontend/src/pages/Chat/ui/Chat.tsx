import { Message, MessagesDB } from '@entities/messages';
import {
  apiKeyStoreActions,
  useApiKeyStore,
} from '@features/ai-providers/model/useApiKeyStore';
import { useSendMessage } from '@features/sendMessage';
import { AppShellMain, Stack, Center, Box } from '@mantine/core';
import { providers } from '@shared/api/ai/container';
import { AI } from '@shared/api/ai/lib/symbols/symbols';
import type { TSources } from '@shared/api/ai/types/sources.type';
import { useAdaptiveSpace } from '@shared/lib/hooks/useAdaptiveSpace';
import { useParams } from '@tanstack/react-router';
import { AiInput } from '@widgets/AiInput/ui/AiInput';
import { useLiveQuery } from 'dexie-react-hooks';
import { lowerCase, map } from 'lodash';
import { motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
const MotionMessage = motion.create(Message);
export function Chat() {
  const { id, model, provider } = useParams({
    from: '/chat/$id/$provider/$model',
  });
  const { sendMessage, messages } = useSendMessage(
    `${lowerCase(provider)}/${model}`
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const source = useMemo(
  //   () => providers.get(AI[provider as TSources]),
  //   [provider]
  // );

  // const messages = useLiveQuery(
  //   async () => await MessagesDB.getChatMessages({ chatId: id }), [id]
  // );

  const [ref, Space] = useAdaptiveSpace();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // const initMessage = useLiveQuery(
  //   async () => await MessagesDB.getInitMessage({ chatId: Number(id) }),
  //   [id]
  // );
  // const apiKey = apiKeyStoreActions.doGetApi(source.meta.providerName);
  // useEffect(() => {
  //   if (!initMessage || initMessage.processed) return;
  //
  //   const sendInitMessage = async () => {
  //     try {
  //       if (apiKey) {
  //         const response = await source
  //           .with({ apiKey })
  //           .sendMessage(initMessage.content, model);
  //         await MessagesDB.setProcessed({
  //           id: initMessage.id,
  //           processed: true,
  //         });
  //         await MessagesDB.createMessage({
  //           role: 'assistent',
  //           chatId: Number(id),
  //           content: response.data.content as string,
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Failed to send init message:', error);
  //     }
  //   };
  //
  //   sendInitMessage();
  // }, [initMessage, id, source, apiKey, model]);
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
            // console.log(1);
            // try {
            //   await MessagesDB.createMessage({
            //     chatId: Number(id),
            //     content,
            //     processed: false, // Не обработано ещё
            //     role: 'user',
            //   });
            //
            //   const history = await MessagesDB.getChatHistory({
            //     chatId: Number(id),
            //     key: 'text',
            //   });
            //
            //   const response = await source
            //     .with({ apiKey })
            //     .sendMessage(history, model);
            //
            //   await MessagesDB.createMessage({
            //     chatId: Number(id),
            //     processed: false,
            //     role: 'assistent',
            //     content: response?.data.content ?? 'Ошибка: AI не ответил',
            //   });
            // } catch (error) {
            //   console.error('Ошибка отправки сообщения:', error);
            //
            //   // Опционально: создаём сообщение об ошибке
            //   await MessagesDB.createMessage({
            //     chatId: Number(id),
            //     processed: false,
            //     role: 'assistent',
            //     content: 'Произошла ошибка при отправке запроса',
            //   });
            // }
            sendMessage({ text: content });
          }}
          readOnly
          providers={[{ label: model, value: 'model' }]}
        />
      </Center>
    </AppShellMain>
  );
}
