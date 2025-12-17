import { AskModelPromptForm } from '@/features/ask-model';
import { AppShellMain, Stack, useMantineTheme } from '@mantine/core';
import { useResponsive } from '@shared/lib/hooks/useResponsive';
import { LogotypeCombined } from '@shared/ui/LogotypeSection';
import { useNavigate } from '@tanstack/react-router';
import { ternary } from '@utils/conditions/ternary';
import { useState } from 'react';
export const IndexPage = () => {
  const [model, setModel] = useState('');
  const { mobile } = useResponsive();
  const navigate = useNavigate();
  return (
    <AppShellMain h={'100dvh'}>
      <Stack justify={ternary(mobile, 'end', 'center')} h={'100%'}>
        <Stack
          justify={ternary(mobile, 'space-between', 'center')}
          align="center"
          h={'60%'}
        >
          <LogotypeCombined />
          <AskModelPromptForm
            {...{ model, setModel }}
            onSubmit={(messgae) => {
              navigate({ to: '/chat/$id/$provider/$model', params: {} });
            }}
          />
        </Stack>
      </Stack>
    </AppShellMain>
  );
};
