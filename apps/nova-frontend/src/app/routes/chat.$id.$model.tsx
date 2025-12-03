import { Message, MessagesDB } from "@entities/messages";
import {
  Affix,
  AppShellMain,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Portal,
  ScrollArea,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { AiInput } from "@widgets/AiInput/ui/AiInput";
import { useLiveQuery } from "dexie-react-hooks";
import { map } from "lodash";
import { useRef } from "react";

export const Route = createFileRoute("/chat/$id/$model")({
  component: RouteComponent,
});

function RouteComponent() {
  const { ref, height } = useElementSize();
  const { id, model } = useParams({ from: "/chat/$id/$model" });
  const messages = useLiveQuery(
    async () => await MessagesDB.getChatMessages({ chatId: id }),
    [id],
  );

  return (
    <AppShellMain>
      <Grid justify="center" align="center">
        <Grid.Col>
          <ScrollArea
            h={"40rem"}
            p={{ base: "xs", sm: "md" }}
            w={{ base: "100%", sm: "60rem" }}
          >
            {messages &&
              map(messages, (message) => <Message message={message} />)}
            <Space h={height * 3} />

            <Center>
              <AiInput readOnly providers={[model]} />
            </Center>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={"auto"}></Grid.Col>
      </Grid>
    </AppShellMain>
  );
}
