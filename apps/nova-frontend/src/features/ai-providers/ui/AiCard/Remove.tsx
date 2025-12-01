import { ActionIcon } from "@mantine/core";
import { Trash } from "lucide-react";

export const Remove = ActionIcon.withProps({
  color: "red.9",
  bdrs: "xl",
  size: "lg",
  variant: "filled",
  autoContrast: true,
  children: <Trash size={16} />,
});
