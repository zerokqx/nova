import { useAppForm } from '@/shared/ui/Form';
import { IModalApiKeyComponent } from '../types/ModalApiKey.interface';

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
          <form.DirtyButton type="submit">Сохранить</form.DirtyButton>
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
