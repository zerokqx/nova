import {
  AppShellAside,
  Group,
  Stack,
  Text,
  UnstyledButton,
  type AppShellAsideProps,
} from "@mantine/core";
import type { ReactNode } from "react";
import style from "@styles/effects/Hover.module.css";
import { ternary } from "@utils/conditions/ternary";

const AsideRoot = ({ children, ...props }: AppShellAsideProps) => {
  return (
    <AppShellAside
      withBorder={false}
      p={"md"}
      bg={"black"}
      color="white"
      {...props}
    >
      <Stack gap={"md"}>{children}</Stack>
    </AppShellAside>
  );
};

const AsideAction = ({
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

const AsideStatic = ({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) => {
  return (
    <Stack gap={"xs"}>
      {title && (
        <Text c="dimmed" size="xs" fw={700} tt="uppercase" px={"xs"}>
          {title}
        </Text>
      )}
      {children}
    </Stack>
  );
};

export const Aside = Object.assign(AsideRoot, {
  Action: AsideAction,
  Static: AsideStatic,
});
