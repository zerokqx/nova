import { useAppForm } from '@/shared/ui/Form';
import { IModalApiKeyComponent } from '../types/ModalApiKey.interface';

export const Add: IModalApiKeyComponent['Add'] = ({ onSubmit }) => {
  const form = useAppForm({
    defaultValues: {
      apiKey: '',
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
