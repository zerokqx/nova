import { ActionIcon, Button } from "@mantine/core";
import { Pencil } from "lucide-react";

export const PuthcApiKeyButton = ActionIcon.withProps({
  bdrs: "xl",
  size: "lg",
  color: "dark.9",
  children: <Pencil size={16} />,
});
