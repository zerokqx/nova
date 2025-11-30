import { useAppForm } from "@components/Form/ui/FormV2/FormV2";
import { Modal, type ModalProps } from "@mantine/core";
import { Save } from "lucide-react";
import { useAiProviders } from "src/stores/useAiProviders";
import { apiKeyStoreActions } from "src/stores/useApiKeyStore";

export const ModalAddProvider = ({
  providerName,
  title,
  onClose,
  ...props
}: {
  opened: ModalProps["opened"];
  onClose: ModalProps["onClose"];
  title: string;
  providerName: string;
}) => {
  const updateProviders = useAiProviders((s) => s.update);
  const form = useAppForm({
    defaultValues: {
      api: "",
    },
    onSubmit: ({ value }) => {
      if (value.api.length > 20) {
        apiKeyStoreActions.doNewApiKey(providerName, value.api);
        updateProviders((s) => s.push(providerName));
        onClose();
      }
    },
  });
  return (
    <Modal onClose={onClose} title={title} {...props}>
      <form.AppForm>
        <form.Form>
          <form.Vertical p={"md"}>
            <form.AppField
              name="api"
              children={(field) => <field.TextInput placeholder="API ключ" />}
            />
            <form.DirtyButton type="submit" leftSection={<Save size={16} />}>
              Сохранить
            </form.DirtyButton>
          </form.Vertical>
        </form.Form>
      </form.AppForm>
    </Modal>
  );
};
