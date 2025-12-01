import {
  ActionIcon,
  Button,
  Group,
  List,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { aiProvidersAction } from "@shared/api/ai/model/useAiProvidersStore";
import { ternary } from "@utils/conditions/ternary";
import { map } from "lodash";
import { CircleX, Key, Trash } from "lucide-react";
import { ModalApiAddKeyForm } from ".";
import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import type { TSources } from "@shared/api/ai/types/sources.type";

export const AiCard = ({
  name,
  available,
  models,
}: {
  name: TSources;
  available: boolean;
  models: TModels;
}) => {
  const t = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <Stack
      bd={`${t.colors.dark[9]} solid 0.1rem`}
      miw={330}
      maw={660}
      p={"md"}
      bdrs={"sm"}
      gap={"sm"}
    >
      <Group justify="space-between">
        <Title size={"lg"} c={"blue"}>
          {name}
        </Title>
        {available && (
          <ActionIcon
            color="red"
            variant="filled"
            autoContrast
            onClick={() => aiProvidersAction.doRemove(name)}
          >
            <Trash size={16} />
          </ActionIcon>
        )}
      </Group>

      <List p={"sm"}>
        {ternary(
          available,
          <List.Item c={"lime"}>Доступно</List.Item>,
          <>
            <List.Item icon={<CircleX />} c={"red"}>
              Не доступно, создайте API ключ
            </List.Item>
          </>,
        )}
      </List>
      <ModalApiAddKeyForm
        providerName={name}
        title={`Ключ ${name}`}
        opened={opened}
        onClose={toggle}
      />

      <Group justify="space-between" align="end">
        <Stack gap={"xs"}>
          <Title size={"lg"} c={"blue"}>
            Модели
          </Title>
          {map(models, (model) => (
            <Text>{model}</Text>
          ))}
        </Stack>

        {!available && (
          <Group justify="end">
            <Button leftSection={<Key size={16} />} onClick={toggle}>
              Создать ключ
            </Button>
          </Group>
        )}
      </Group>
    </Stack>
  );
};
