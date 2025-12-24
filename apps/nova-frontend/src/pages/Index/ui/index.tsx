import { AskModelPromptForm } from '@/features/ask-model';
import { useCreateChat } from '@/features/chats/api/create-chat';
import { doSetInitMessage } from '@/features/messages/model/intializeMessageStore';
import { AnimatedRoute } from '@/shared/ui/animated-route';
import { AppShellMain, Stack } from '@mantine/core';
import { useResponsive } from '@shared/lib/hooks/useResponsive';
import { LogotypeCombined } from '@shared/ui/LogotypeSection';
import { useNavigate } from '@tanstack/react-router';
import { ternary } from '@utils/conditions/ternary';
import { useState } from 'react';
export const IndexPage = () => {
  const [model, setModel] = useState('');
  const { mobile } = useResponsive();
  const navigate = useNavigate();
  const { mutateAsync: createChat } = useCreateChat();
  return (
    <AnimatedRoute variant="blur">
      <AppShellMain h={'100dvh'}>
        <Stack justify={ternary(mobile, 'end', 'center')} h={'100%'}>
          <Stack justify={ternary(mobile, 'space-between', 'center')} align="center" h={'60%'}>
            <LogotypeCombined />
            <AskModelPromptForm
              {...{ model, setModel }}
              onSubmit={async ({ value }) => {
                const chat = await createChat({
                  body: { title: value.text, provider: value.model },
                });
                doSetInitMessage(value.text);
                await navigate({
                  to: '/chat/$id',
                  params: { id: chat.id },
                });
              }}
            />
          </Stack>
        </Stack>
      </AppShellMain>
    </AnimatedRoute>
  );
};
