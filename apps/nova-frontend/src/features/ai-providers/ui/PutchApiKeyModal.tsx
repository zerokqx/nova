import { Modal, Title } from "@mantine/core";
import { PutchApiKeyForm } from "./PutchApiKeyForm";
import type { IPutchApiKeyModalProps } from "./types/PutchApiKeyModal.interface";
import { apiKeyStoreActions, useApiKeyStore } from "../model/useApiKeyStore";

export const PutchApiKeyModal = ({
  name,
  onClose,
  ...props
}: IPutchApiKeyModalProps) => {
  const api = useApiKeyStore((s) => s.data[name]);
  return (
    <Modal onClose={onClose} keepMounted={false} {...props}>
      {api ? (
        <PutchApiKeyForm
          onSubmit={({ value: { api } }) => {
            apiKeyStoreActions.doPutchApiKey(name, api);
            onClose();
          }}
          initial={{ api }}
        />
      ) : (
        <Title size={"lg"} c={"blue"}>
          Вы не можете редактировать того чего нету
        </Title>
      )}
    </Modal>
  );
};
