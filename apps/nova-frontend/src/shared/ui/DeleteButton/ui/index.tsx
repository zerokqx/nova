import { ActionIcon, type ActionIconProps } from "@mantine/core";
import { Delete, Trash } from "lucide-react";
import type { ComponentProps } from "react";

export const DeleteButton = ({
  ...props
}: Omit<ActionIconProps, "children"> &
  Pick<ComponentProps<"button">, "onClick">) => {
  return (
    <ActionIcon bdrs={"xl"} {...props} color="dark.9" c={"blue.5"}>
      <Trash size={16} />
    </ActionIcon>
  );
};
