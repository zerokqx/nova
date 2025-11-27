import {
  ActionIcon,
  AppShellHeader,
  Burger,
  Grid,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { useLayoutStore } from "src/stores/useLayout";
import Settings from "@assets/settings.svg?react";
import { useAnimateMini } from "motion/react";
import { ternary } from "@utils/conditions/ternary";

export const Header = () => {
  const update = useLayoutStore((s) => s.update);
  const navbar = useLayoutStore((s) => s.data.navbar);
  const aside = useLayoutStore((s) => s.data.aside);
  const t = useMantineTheme().spacing;
  const [scope, animate] = useAnimateMini();
  return (
    <AppShellHeader p={`0 ${t.md}`} bg={"black"}>
      <Group justify="space-between" h={"100%"}>
        <Burger
          color="blue"
          opened={navbar}
          onClick={() => update((s) => (s.navbar = !s.navbar))}
        />
        <ActionIcon
          color={ternary(aside, "gray", "blue")}
          onClick={() => {
            animate(
              scope.current,
              {
                rotate: ternary(aside, "-360deg", "360deg"),
              },
              { duration: 1.5 },
            );
            update((s) => (s.aside = !s.aside));
          }}
          variant="transparent"
        >
          <Settings ref={scope} />
        </ActionIcon>
      </Group>
    </AppShellHeader>
  );
};
