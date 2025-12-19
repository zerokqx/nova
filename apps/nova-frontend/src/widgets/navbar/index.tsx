import {
  ActionIcon,
  AppShellNavbar,
  Center,
  Group,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { map, update } from 'lodash';
import { NavItem } from './NavItem';
import { useGetAllChats } from '@/features/chats/api/get-all-chats';
import { CheckCheck, Trash } from 'lucide-react';
import { useNavbarStore } from './model/navbar-mode-store';
import { NavbarControls } from './NavbarControls';
import { useLogger } from '@mantine/hooks';
export const Navbar = () => {
  const { data: chats } = useGetAllChats();
  const s = useNavbarStore((s) => s.data.selectedItems);
  useLogger('SLEECT', [s]);
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
      {chats && chats.length > 0 && <NavbarControls />}
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
