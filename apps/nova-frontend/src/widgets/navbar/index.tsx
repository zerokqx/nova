import {
  AppShellNavbar,
  Center,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { map } from 'lodash';
import { NavItem } from './NavItem';
import { useGetAllChats } from '@/features/chats/api/get-all-chats';
export const Navbar = () => {
  const { data: chats } = useGetAllChats();
  return (
    <AppShellNavbar
      p={'md'}
      bg={'black'}
      zIndex={501}
      styles={(t) => ({
        navbar: {
          overflowY: 'auto',
          borderColor: t.colors.blue[5],
        },
      })}
    >
      <Space h={'1rem'} />

      {chats === undefined ? (
        <Loader />
      ) : chats.length === 0 ? (
        <Center>
          <Stack>
            <Title c={'blue'}>Чатов нет</Title>
            <Text>Перейдите на главную страницу и введите запрос</Text>
          </Stack>
        </Center>
      ) : (
        map(chats.reverse(), ({ id, title }) => (
          <NavItem key={`chat-${title}-${id}`} id={id} text={title} />
        ))
      )}
    </AppShellNavbar>
  );
};
