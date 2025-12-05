import { useAppForm } from "@shared/ui/Form";
import type { IPutchApiKeyFormProps } from "./types/PutchApiKeyForm.interface";

export const PutchApiKeyForm = ({
  initial: { api },
  onSubmit,
}: IPutchApiKeyFormProps) => {
  const form = useAppForm({
    defaultValues: { api },
    onSubmit(props) {
      onSubmit(props);
    },
  });

  return (
    <form.AppForm>
      <form.Form>
        <form.Vertical>
          <form.AppField name="api" children={(field) => <field.TextInput />} />
          <form.DirtyButton type="submit">Сохранить</form.DirtyButton>
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
