import { Group, Stack, Text, UnstyledButton } from "@mantine/core";
import type { ReactNode } from "react";

import style from "@shared/styles/effects/Hover.module.css";
export const AsideAction = ({
  icon,
  label,
  onClick,
  description,
}: {
  icon?: ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
}) => {
  return (
    <UnstyledButton
      className={style.main}
      onClick={onClick}
      w={"100%"}
      bdrs={"sm"}
    >
      <Group p={"xs"} wrap="nowrap" align="center">
        {icon && (
          <Group align="center" justify="center">
            {icon}
          </Group>
        )}
        <Stack gap={2}>
          <Text c="white" size="sm" fw={500}>
            {label}
          </Text>
          {description && (
            <Text c="dimmed" size="xs">
              {description}
            </Text>
          )}
        </Stack>
      </Group>
    </UnstyledButton>
  );
};
