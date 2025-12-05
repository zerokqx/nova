import { useAppForm } from "@shared/ui/Form/ui/FormV2/FormV2";
import { Save } from "lucide-react";
import type { IApiAddKeyFormProps } from "./types/ApiAddKeyForm.interface";

export const ApiAddKeyForm = ({ onSubmit }: IApiAddKeyFormProps) => {
  const form = useAppForm({
    defaultValues: {
      api: "",
    },
    onSubmit: (data) => {
      onSubmit?.(data);
    },
  });
  return (
    <form.AppForm>
      <form.Form>
        <form.Vertical p={"md"}>
          <form.AppField
            validators={{
              onSubmit: ({ value }) =>
                value.length > 0 ? undefined : "Ничего не ввидено",
            }}
            name="api"
            children={(field) => <field.TextInput placeholder="API ключ" />}
          />
          <form.DirtyButton type="submit" leftSection={<Save size={16} />}>
            Сохранить
          </form.DirtyButton>
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
