import { Message, MessagesDB } from "@entities/messages";
import {
  apiKeyStoreActions,
  useApiKeyStore,
} from "@features/ai-providers/model/useApiKeyStore";
import { AppShellMain, Stack, Center } from "@mantine/core";
import { providers } from "@shared/api/ai/container";
import { AI } from "@shared/api/ai/lib/symbols/symbols";
import type { TSources } from "@shared/api/ai/types/sources.type";
import { useAdaptiveSpace } from "@shared/lib/hooks/useAdaptiveSpace";
import { useParams } from "@tanstack/react-router";
import { AiInput } from "@widgets/AiInput/ui/AiInput";
import { useLiveQuery } from "dexie-react-hooks";
import { map } from "lodash";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef } from "react";

const MotionMessage = motion.create(Message);
export function Chat() {
  const { id, model, provider } = useParams({
    from: "/chat/$id/$provider/$model",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const source = useMemo(
    () => providers.get(AI[provider as TSources]),
    [provider],
  );

  const messages = useLiveQuery(
    async () => await MessagesDB.getChatMessages({ chatId: id }),
    [id],
  );

  const [ref, Space] = useAdaptiveSpace();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initMessage = useLiveQuery(
    async () => await MessagesDB.getInitMessage({ chatId: Number(id) }),
    [id],
  );
  const apiKey = apiKeyStoreActions.doGetApi(source.meta.providerName);
  useEffect(() => {
    if (!initMessage || initMessage.processed) return;

    const sendInitMessage = async () => {
      try {
        if (apiKey) {
          const response = await source
            .with({ apiKey })
            .sendMessage(initMessage.content, model);
          await MessagesDB.setProcessed({
            id: initMessage.id,
            processed: true,
          });
          await MessagesDB.createMessage({
            role: "assistent",
            chatId: Number(id),
            content: response.data.content as string,
          });
        }
      } catch (error) {
        console.error("Failed to send init message:", error);
      }
    };

    sendInitMessage();
  }, [initMessage, id, apiKey, model]);
  return (
    <>
      <AppShellMain>
        <Center>
          <Stack w={{ base: "100%", sm: "40%" }}>
            {messages &&
              map(messages, (message) => (
                <MotionMessage
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={`${message.id}-${message.chatId}`}
                  message={message}
                />
              ))}
          </Stack>
        </Center>

        <div ref={messagesEndRef} />
        <Space />
        <Center
          ref={ref}
          pos="fixed"
          bottom={0}
          pb={"md"}
          left={0}
          right={0}
          style={{
            transition: "padding ease 0.1s",
            paddingLeft: "var(--app-shell-navbar-offset, --mantine-spacing-md)",
            paddingRight: "var(--app-shell-aside-offset, --mantine-spacing-md)",
            zIndex: 0,
          }}
          w="100%"
        >
          <AiInput
            onSubmit={async ({ value: { content } }) => {
              console.log(1);
              try {
                // 1. Создаём сообщение пользователя
                await MessagesDB.createMessage({
                  chatId: Number(id),
                  content,
                  processed: false, // Не обработано ещё
                  role: "user",
                });

                const history = await MessagesDB.getChatHistory({
                  chatId: Number(id),
                  key: "text",
                });

                const response = await source
                  .with({ apiKey })
                  .sendMessage(history, model);

                await MessagesDB.createMessage({
                  chatId: Number(id),
                  processed: false,
                  role: "assistent",
                  content: response?.data.content ?? "Ошибка: AI не ответил",
                });
              } catch (error) {
                console.error("Ошибка отправки сообщения:", error);

                // Опционально: создаём сообщение об ошибке
                await MessagesDB.createMessage({
                  chatId: Number(id),
                  processed: false,
                  role: "assistent",
                  content: "Произошла ошибка при отправке запроса",
                });
              }
            }}
            readOnly
            providers={[{ label: model, value: "model" }]}
          />
        </Center>
      </AppShellMain>
    </>
  );
}
