import {
  ActionIcon,
  Affix,
  AppShellNavbar,
  Button,
  Center,
  Group,
  Loader,
  Portal,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useLiveQuery } from 'dexie-react-hooks';
import { map } from 'lodash';
import { NavItem } from './NavItem';
import { ChatsDB } from '@entities/chat';
import { useGetAllChats } from '@/features/chats/api/get-all-chats';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
const MotionPlus = motion.create(Plus);
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
          <NavItem key={id} id={id} text={title} />
        ))
      )}
      <Group pos={'sticky'} right={0} bottom={0} justify="end">
        <ActionIcon
          sx={{
            transition: 'transform ease 0.2s',
            '&:hover': {
              transform: 'scale(0.9)',
            },
          }}
          bdrs={'lg'}
          size={'input-xl'}
        >
          <MotionPlus
            whileHover={{
              scale: 1.3,
            }}
          />
        </ActionIcon>
      </Group>
    </AppShellNavbar>
  );
};
