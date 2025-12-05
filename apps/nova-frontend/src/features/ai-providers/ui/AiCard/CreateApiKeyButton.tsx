import { Button } from "@mantine/core";
import { Key } from "lucide-react";

export const CreateApiKeyButton = Button.withProps({
  children: "Создать ключ",
  bdrs: "xl",
  leftSection: <Key size={16} />,
});
