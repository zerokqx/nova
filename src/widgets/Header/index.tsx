import {
  ActionIcon,
  AppShellHeader,
  Burger,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { useLayoutStore } from "src/stores/useLayout";
import { useAnimateMini } from "motion/react";
import { ternary } from "@utils/conditions/ternary";
import { Settings } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { LogotypeIcon } from "../LogotypeSection/LogotypeIcon";

export const Header = () => {
  const update = useLayoutStore((s) => s.update);
  const navbar = useLayoutStore((s) => s.data.navbar);
  const aside = useLayoutStore((s) => s.data.aside);
  const t = useMantineTheme();
  const navigate = useNavigate();
  const [scope, animate] = useAnimateMini();
  return (
    <AppShellHeader p={`0 ${t.spacing.md}`} bg={"black"}>
      <Group justify="space-between" h={"100%"}>
        <Burger
          color="blue"
          opened={navbar}
          onClick={() => update((s) => (s.navbar = !s.navbar))}
        />

        <LogotypeIcon
          onClick={() => {
            navigate({ to: "/" });
          }}
          width={32}
        />
        <ActionIcon
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
          <Settings color={aside ? "gray" : t.colors.blue[5]} ref={scope} />
        </ActionIcon>
      </Group>
    </AppShellHeader>
  );
};
