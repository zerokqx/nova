import { AiCardBlock } from '@/widgets/sources-keys-management/ui';
import { AppShellMain, Group } from '@mantine/core';

export const SettingsPage = () => {
  return (
    <AppShellMain h={'100dvh'}>
      <Group align="start">
        <AiCardBlock />
      </Group>
    </AppShellMain>
  );
};
