import { Group, Text } from "@mantine/core";
import stl from "./styles/nav-item-hove.module.css";
import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import { useNavigate } from "@tanstack/react-router";

export const NavItem = ({
  text,
  id,
  model,
}: {
  text: string;
  id: number;
  model: TModels[number];
}) => {
  const navigate = useNavigate();
  return (
    <Group
      onClick={() => {
        navigate({
          to: "/chat/$id/$model",
          params: {
            id: id.toString(),
            model,
          },
        });
      }}
      className={stl.effect}
      w={"100%"}
      p={"md"}
      bdrs={"xl"}
      wrap="nowrap"
    >
      <Text w={"100%"} c={"white"} truncate="end">
        {text}
      </Text>
    </Group>
  );
};
