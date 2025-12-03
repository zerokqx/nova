import { Modal, type ModalProps } from "@mantine/core";
import { ApiAddKeyForm } from "./ApiAddKeyForm";
import type { TSources } from "@shared/api/ai/types/sources.type";
import { apiKeyStoreActions } from "../model/useApiKeyStore";

export const ModalApiAddKeyForm = ({
  providerName,
  ...props
}: {
  opened: ModalProps["opened"];
  onClose: ModalProps["onClose"];
  title: string;
  providerName: TSources;
}) => {
  return (
    <Modal {...props}>
      <ApiAddKeyForm
        onSubmit={({ value }) => {
          apiKeyStoreActions.doNewApiKey(providerName, value.api);
          props.onClose();
        }}
      />
    </Modal>
  );
};
