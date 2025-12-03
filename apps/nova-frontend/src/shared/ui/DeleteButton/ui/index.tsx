import { ActionIcon, type ActionIconProps } from "@mantine/core";
import { Delete, Trash } from "lucide-react";
import type { ComponentProps } from "react";

export const DeleteButton = ({
  ...props
}: Omit<ActionIconProps, "children"> &
  Pick<ComponentProps<"button">, "onClick">) => {
  return (
    <ActionIcon bdrs={"xl"} {...props} color="red">
      <Trash size={16} />
    </ActionIcon>
  );
};
