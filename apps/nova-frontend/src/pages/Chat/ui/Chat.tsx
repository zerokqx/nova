import { Message, MessagesDB } from "@entities/messages";
import {
  apiKeyStoreActions,
  useApiKeyStore,
} from "@features/ai-providers/model/useApiKeyStore";
import { AppShellMain, Stack, Center } from "@mantine/core";
import { getAllow } from "@shared/api/ai/utils/meta/getAllow";
import { useAdaptiveSpace } from "@shared/lib/hooks/useAdaptiveSpace";
import { useParams } from "@tanstack/react-router";
import { AiInput } from "@widgets/AiInput/ui/AiInput";
import { useLiveQuery } from "dexie-react-hooks";
import { keys, map } from "lodash";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const MotionMessage = motion.create(Message);
export function Chat() {
  const [ref, Space] = useAdaptiveSpace();
  const { id, model } = useParams({ from: "/chat/$id/$provider/$model" });
  const messages = useLiveQuery(
    async () => await MessagesDB.getChatMessages({ chatId: id }),
    [id],
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
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
            onSubmit={({ value: { content } }) => {
              MessagesDB.createMessage({
                chatId: Number(id),
                content,
                role: "user",
              });
            }}
            readOnly
            providers={[{ label: model, value: "model" }]}
          />
        </Center>
      </AppShellMain>
    </>
  );
}
