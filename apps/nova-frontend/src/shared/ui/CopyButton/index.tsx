import { ActionIcon, type ActionIconProps } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { Copy } from "lucide-react";

export const CopyButton = ({
  copyTarget,
  ...props
}: ActionIconProps & { copyTarget: string }) => {
  const clipboard = useClipboard();
  return (
    <ActionIcon
      onClick={() => {
        clipboard.copy(copyTarget);
      }}
      bdrs={"xl"}
      {...props}
    >
      <Copy size={16} />
    </ActionIcon>
  );
};
