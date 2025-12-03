import { Group, rem, Text, useMantineTheme } from "@mantine/core";
import stl from "./styles/nav-item-hove.module.css";
import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useLayoutStore } from "@shared/lib/stores/useLayout";

export const NavItem = ({
  text,
  id,
  model,
}: {
  text: string;
  id: number;
  model: TModels[number];
}) => {
  const t = useMantineTheme();
  const updateLayout = useLayoutStore((s) => s.update);
  return (
    <Link
      to="/chat/$id/$model"
      params={{
        id: id.toString(),
        model,
      }}
      style={{
        borderRadius: t.radius.md,
        textDecoration: "none",
      }}
      onClick={() => {
        updateLayout((s) => {
          s.aside = false;
          s.navbar = false;
        });
      }}
      activeProps={{
        style: { border: `${t.colors.dark[9]} solid ${rem(1)}` },
      }}
    >
      <Group
        bdrs={"inherit"}
        className={stl.effect}
        w={"100%"}
        p={"md"}
        wrap="nowrap"
      >
        <Text w={"100%"} c={"white"} truncate="end">
          {text}
        </Text>
      </Group>
    </Link>
  );
};
