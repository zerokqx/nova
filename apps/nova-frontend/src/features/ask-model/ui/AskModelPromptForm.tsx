import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { Group } from '@mantine/core';
import { Bot } from 'lucide-react';
import { useGetAvailableForMantine } from '../model/useGetAvailable';
import { IAskModelPromptFormProps } from './types/AskModelPromptForm.interface';
import { motion } from 'motion/react';
import { useAppForm } from '@/shared/ui/Form';

const MotionPromptInput = motion.create(PromptInput);
export const AskModelPromptForm = (props: IAskModelPromptFormProps) => {
  const { format } = useGetAvailableForMantine();
  const { onSubmit, withSelect = true, status, callbacks } = props;

  const form = useAppForm({
    defaultState: { canSubmit: true },
    defaultValues: { text: '', model: '' },

    onSubmit,
  });
  const showSelect = withSelect !== false;

  return (
    <form.AppForm>
      <MotionPromptInput
        initial={{ scale: 0, opacity: 0 }}
        onSubmit={async (message) => {
          await form.handleSubmit(message);
          form.reset();
        }}
        animate={{ scale: 1, opacity: 1 }}
        className="
        rounded-2xl
        bg-black
        max-w-120
        **:data-[slot='input-group']:border-0
        **:data-[slot='input-group']:ring-0
        **:data-[slot='input-group']:shadow-none
      "
      >
        <form.AppField
          name="text"
          validators={{
            onChange: ({ value }) => (value.length > 0 ? undefined : 'Ввведите что нибудь'),
            onSubmit: ({ value }) => (value.length > 0 ? undefined : 'Ввведите что нибудь'),
          }}
          children={(field) => (
            <PromptInputTextarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="outline-none no-input-ring"
              placeholder="Спросите что угодно"
            />
          )}
        />

        <PromptInputFooter className="outline-none">
          <Group w="100%" justify={showSelect ? 'space-between' : 'end'}>
            {showSelect && 'model' in props && 'setModel' in props && (
              <form.AppField
                validators={{
                  onSubmit: ({ value }) => (value ? undefined : 'Нужно выбрать модель'),
                }}
                name="model"
                children={(field) => (
                  <field.Select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e ?? '')}
                    placeholder="Выберите модель"
                    rightSection={null}
                    leftSection={<Bot size={16} />}
                    w={'fit-content'}
                    data={format}
                  />
                )}
              />
            )}

            <form.Subscribe
              selector={(state) => [state.canSubmit]}
              children={([canSubmit]) => {
                return (
                  <PromptInputSubmit
                    onClick={status === 'streaming' ? callbacks.stop : () => null}
                    status={status}
                    disabled={!canSubmit}
                    className="rounded-full"
                    size={'sm'}
                  />
                );
              }}
            />
          </Group>
        </PromptInputFooter>
      </MotionPromptInput>
    </form.AppForm>
  );
};
