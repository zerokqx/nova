import { AnimatedRoute } from '@/shared/ui/animated-route';
import { AiCardBlock } from '@/widgets/sources-keys-management/ui';
import { AppShellMain, Group } from '@mantine/core';

export const SettingsPage = () => {
  return (
    <AnimatedRoute variant="blur">
      <AppShellMain h={'100dvh'} style={{ overflow: 'auto' }}>
        <Group align="stretch">
          <AiCardBlock />
        </Group>
      </AppShellMain>
    </AnimatedRoute>
  );
};
