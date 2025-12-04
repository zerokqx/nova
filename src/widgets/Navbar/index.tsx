import {
  AppShellNavbar,
  Center,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { map } from "lodash";
import { NavItem } from "./NavItem";
import { ChatsDB } from "@entities/chat";
export const Navbar = () => {
  const chats = useLiveQuery(() => ChatsDB.getAllChats());
  console.log(chats);
  return (
    <AppShellNavbar
      p={"md"}
      bg={"black"}
      zIndex={501}
      styles={(t) => ({
        navbar: {
          overflowY: "auto",
          borderColor: t.colors.blue[5],
        },
      })}
    >
      <Space h={"1rem"} />

      {chats === undefined ? (
        <Loader />
      ) : chats.length === 0 ? (
        <Center>
          <Stack>
            <Title c={"blue"}>Чатов нет</Title>
            <Text>Перейдите на главную страницу и введите запрос</Text>
          </Stack>
        </Center>
      ) : (
        map(chats.reverse(), ({ id, preview, url }) => (
          <NavItem key={id} url={url} {...{ id }} text={preview} />
        ))
      )}
    </AppShellNavbar>
  );
};
