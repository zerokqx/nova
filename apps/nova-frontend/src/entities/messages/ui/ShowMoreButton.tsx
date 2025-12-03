import { Button, type ButtonProps } from "@mantine/core";
import { ChevronDown, ChevronsDown, ChevronUp } from "lucide-react";
import type { ComponentProps } from "react";

export const ShowMoreButton = ({
  show,
  onClick,
}: {
  show: boolean;
  onClick: ComponentProps<"button">["onClick"];
}) => {
  const Icon = show ? ChevronDown : ChevronUp; // ✅ ссылка на компонент
  const text = show ? "Показать " : "Показать больше";
  return (
    <Button
      size="xs"
      bdrs={"lg"}
      color="dark.9"
      onClick={onClick}
      rightSection={<Icon />}
    >
      {text}
    </Button>
  );
};
