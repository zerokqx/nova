import {
  PromptInput,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input';
import { useGetAvailableIncludeSoruce } from '@/features/models';
import { notation } from '@/shared/lib/utils/notation';
import { SendButton } from '@/shared/ui/SendButton';
import { AppShellMain, Group, Stack, useMantineTheme } from '@mantine/core';
import { useResponsive } from '@shared/lib/hooks/useResponsive';
import { LogotypeCombined } from '@shared/ui/LogotypeSection';
import { useNavigate } from '@tanstack/react-router';
import { ternary } from '@utils/conditions/ternary';
import { Cpu } from 'lucide-react';
import { useMemo, useState } from 'react';
export const IndexPage = () => {
  const t = useMantineTheme();
  const { data } = useGetAvailableIncludeSoruce();

  const { mobile } = useResponsive();
  const modelsFormat = useMemo(
    () =>
      data?.map(({ name, source }) => ({
        id: notation.createStringNotation(source.name, '/', name),
        name,
      })) ?? [],
    [data]
  );
  const [model, setModel] = useState('');
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
          <PromptInput
            className="
    max-w-120
    **:data-[slot='input-group']:border-0
    **:data-[slot='input-group']:ring-0
    **:data-[slot='input-group']:shadow-none
  "
          >
            <PromptInputTextarea
              className="outline-none  no-input-ring"
              placeholder="Спросите что угодно"
            />
            <PromptInputFooter className="outline-none">
              <Group w={'100%'} justify="space-between">
                <PromptInputSelect value={model} onValueChange={setModel}>
                  <PromptInputSelectTrigger className="field-sizing-content max-w-fit">
                    <Cpu size={16} color={model ? t.colors.blue[8] : 'white'} />
                  </PromptInputSelectTrigger>

                  <PromptInputSelectContent className="bg-black">
                    {modelsFormat?.map(({ id, name }) => (
                      <PromptInputSelectItem key={id} value={id}>
                        {name}
                      </PromptInputSelectItem>
                    ))}
                  </PromptInputSelectContent>
                </PromptInputSelect>
                <PromptInputSubmit>
                  <SendButton />
                </PromptInputSubmit>
              </Group>
            </PromptInputFooter>
          </PromptInput>
        </Stack>
      </Stack>
    </AppShellMain>
  );
};
