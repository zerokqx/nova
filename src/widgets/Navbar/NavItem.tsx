import { alpha, Group, Text, useMantineTheme } from "@mantine/core";
import stl from "./styles/nav-item-hove.module.css";

export const NavItem = ({ text }: { text: string }) => {
  const t = useMantineTheme().colors;
  const light = alpha(t.blue[6], 0.6);
  return (
    <Group className={stl.effect} w={"100%"} p={"md"} bdrs={"xl"}>
      <Text c={"white"} w={"100%"} truncate="end">
        {text}
      </Text>
    </Group>
  );
};
