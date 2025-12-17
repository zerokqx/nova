import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSelect,
  PromptInputSelectTrigger,
  PromptInputSelectContent,
  PromptInputSelectItem,
} from '@/components/ai-elements/prompt-input';
import { SendButton } from '@/shared/ui/SendButton';
import { Group } from '@mantine/core';
import { Cpu } from 'lucide-react';
import { useMantineTheme } from '@mantine/core';
import { useGetAvailable } from '../model/useGetAvailable';
import { IAskModelPromptFormProps } from './types/AskModelPromptForm.interface';

export const AskModelPromptForm = ({
  onSubmit,
  model,
  setModel,
}: IAskModelPromptFormProps) => {
  const t = useMantineTheme();
  const { modelsFormat } = useGetAvailable();

  return (
    <PromptInput
      onSubmit={onSubmit}
      className="
        max-w-120
        **:data-[slot='input-group']:border-0
        **:data-[slot='input-group']:ring-0
        **:data-[slot='input-group']:shadow-none
      "
    >
      <PromptInputTextarea
        className="outline-none no-input-ring"
        placeholder="Спросите что угодно"
      />

      <PromptInputFooter className="outline-none">
        <Group w="100%" justify="space-between">
          <PromptInputSelect value={model} onValueChange={setModel}>
            <PromptInputSelectTrigger className="field-sizing-content max-w-fit">
              <Cpu size={16} color={model ? t.colors.blue[8] : 'white'} />
            </PromptInputSelectTrigger>

            <PromptInputSelectContent className="bg-black">
              {modelsFormat.map(({ id, name }) => (
                <PromptInputSelectItem key={id} value={id}>
                  {name}
                </PromptInputSelectItem>
              ))}
            </PromptInputSelectContent>
          </PromptInputSelect>

          <SendButton />
        </Group>
      </PromptInputFooter>
    </PromptInput>
  );
};
