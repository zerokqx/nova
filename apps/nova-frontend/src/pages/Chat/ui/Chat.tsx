import { Message, MessagesDB } from "@entities/messages";
import { AppShellMain, Stack, Center } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useAdaptiveSpace } from "@shared/lib/hooks/useAdaptiveSpace";
import { useParams } from "@tanstack/react-router";
import { AiInput } from "@widgets/AiInput/ui/AiInput";
import { useLiveQuery } from "dexie-react-hooks";
import { map } from "lodash";
import { motion } from "motion/react";

const MotionMessage = motion.create(Message);
export function Chat() {
  const [ref, Space] = useAdaptiveSpace();
  const { id, model } = useParams({ from: "/chat/$id/$model" });
  const messages = useLiveQuery(
    async () => await MessagesDB.getChatMessages({ chatId: id }),
    [id],
  );

  return (
    <>
      <AppShellMain>
        <Stack>
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
          <AiInput readOnly providers={[model]} />
        </Center>
      </AppShellMain>
    </>
  );
}
