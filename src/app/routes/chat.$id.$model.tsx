import { Message, MessagesDB } from "@entities/messages";
import {
  Affix,
  AppShellMain,
  AppShellSection,
  Box,
  Center,
  Grid,
  Group,
  ScrollArea,
  Space,
  Stack,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useLayoutStore } from "@shared/lib/stores/useLayout";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { AiInput } from "@widgets/AiInput/ui/AiInput";
import { useLiveQuery } from "dexie-react-hooks";
import { map } from "lodash";

export const Route = createFileRoute("/chat/$id/$model")({
  component: RouteComponent,
});

function RouteComponent() {
  const { height, ref } = useElementSize();
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
              <Message
                key={`${message.id}-${message.chatId}`}
                message={message}
              />
            ))}
        </Stack>

        <Space h={height} />
        <Center
          ref={ref}
          pos="fixed"
          bottom={0}
          pb="md"
          left={0}
          right={0}
          style={{
            transition: "padding ease 0.1s",
            paddingLeft: "var(--app-shell-navbar-offset, 0px)", // НАВБАР (ЛЕВО)
            paddingRight: "var(--app-shell-aside-offset, 0px)", // ASIDE (ПРАВО)
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
