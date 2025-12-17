import { useAppForm } from '@/shared/ui/Form';
import { IModalApiKeyComponent } from '../types/ModalApiKey.interface';
import { useStore } from '@tanstack/react-form';
import { Center } from '@mantine/core';

export const Patch: IModalApiKeyComponent['Patch'] = ({
  onSubmit,
  current,
}) => {
  const form = useAppForm({
    defaultValues: {
      apiKey: current,
    },
    onSubmit,
  });

  const isDirty = useStore(form.store, (s) => s.isDirty);
  return (
    <form.AppForm>
      <form.Form>
        <form.Vertical>
          <form.AppField
            name="apiKey"
            children={(field) => (
              <field.TextInput placeholder="my-secret-key-*******" />
            )}
          />
          <form.Vertical>
            <form.DirtyButton type="submit">Сохранить</form.DirtyButton>
            {isDirty && (
              <Center>
                <form.ResetButton w={'50%'} variant="subtle" bdrs={'xl'}>
                  Отменить изменения
                </form.ResetButton>
              </Center>
            )}
          </form.Vertical>
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
