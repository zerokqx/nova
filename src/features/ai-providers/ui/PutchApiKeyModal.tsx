import { Modal, Title } from "@mantine/core";
import { PutchApiKeyForm } from "./PutchApiKeyForm";
import type { IPutchApiKeyModalProps } from "./types/PutchApiKeyModal.interface";
import { useApiKeyStore } from "../model/useApiKeyStore";

export const PutchApiKeyModal = ({
  name,
  ...props
}: IPutchApiKeyModalProps) => {
  const api = useApiKeyStore((s) => s.data[name]);
  return (
    <Modal keepMounted={false} {...props}>
      {api ? (
        <PutchApiKeyForm {...{ api }} />
      ) : (
        <Title size={"lg"} c={"blue"}>
          Вы не можете редактировать того чего нету
        </Title>
      )}
    </Modal>
  );
};
