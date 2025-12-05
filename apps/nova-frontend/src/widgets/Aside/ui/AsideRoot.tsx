import { AppShellAside, Stack, type AppShellAsideProps } from "@mantine/core";
import { AsideAction } from "./AsideAction";

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

export const Aside = Object.assign(AsideRoot, {
  Action: AsideAction,
});
