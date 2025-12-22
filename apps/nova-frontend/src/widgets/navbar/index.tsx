import { AppShellNavbar, Center, Space, Stack, Title, Text, Alert, Button } from '@mantine/core';
import { map } from 'lodash';
import { NavItem } from './NavItem';
import { useGetAllChats } from '@/features/chats/api/get-all-chats';
import { NavbarControls } from './NavbarControls';
import { Loader } from '@mantine/core';
import { AlertCircle } from 'lucide-react';
import { ErrorMessage } from '@/shared/ui/message-blocs';

export const Navbar = () => {
  const { data: chats, isLoading, isError, refetch } = useGetAllChats();

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

      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : isError ? (
        <ErrorMessage
          leftSection={<AlertCircle />}
          center
          message="Не удалось загрузить список чатов"
        >
          <Button onClick={() => refetch()} color="red" variant="light">
            Попробовать еще раз
          </Button>
        </ErrorMessage>
      ) : chats?.length === 0 ? (
        <Center>
          <Stack>
            <Title c={'blue'}>Чатов нет</Title>
            <Text>Перейдите на главную страницу и введите запрос</Text>
          </Stack>
        </Center>
      ) : (
        <>
          <NavbarControls />
          {map(chats, ({ id, title }, i) => (
            <NavItem key={`chat-${i}-${id}`} id={id} text={title} />
          ))}
        </>
      )}
    </AppShellNavbar>
  );
};
