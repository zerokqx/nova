import { useAppForm } from "@shared/ui/Form";
import type { IPuthcApiKeyFormProps } from "./types/PutchApiKeyForm.interface";

export const PutchApiKeyForm = ({ api }: IPuthcApiKeyFormProps) => {
  const form = useAppForm({ defaultValues: { api } });

  return (
    <form.AppForm>
      <form.Form>
        <form.Vertical>
          <form.AppField name="api" children={(field) => <field.TextInput />} />
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
