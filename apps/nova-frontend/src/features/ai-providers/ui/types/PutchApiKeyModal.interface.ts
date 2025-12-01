import type { ModalProps } from "@mantine/core";
import type { TSources } from "@shared/api/ai/types/sources.type";

export interface IPutchApiKeyModalProps {
  opened: boolean;
  name: TSources;
  onClose: ModalProps["onClose"];
}
