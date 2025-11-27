import { ModalAddProvider } from "@components/ModalAddProvider";
import {
  ActionIcon,
  Button,
  Group,
  List,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ternary } from "@utils/conditions/ternary";
import { CircleX, Key, SoapDispenserDroplet } from "lucide-react";
import { useAiProviders } from "src/stores/useAiProviders";

export const AiCard = ({
  name,
  available,
  models,
}: {
  name: string;
  available: boolean;
  models: [string];
}) => {
  const t = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <Stack
      bd={`${t.colors.dark[9]} solid 0.1rem`}
      p={"md"}
      bdrs={"sm"}
      gap={"sm"}
    >
      <Title size={"lg"} c={"blue"}>
        {name}
      </Title>
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
      {!available && (
        <Group justify="end">
          <Button leftSection={<Key size={16} />} onClick={toggle}>
            Создать ключ
          </Button>
        </Group>
      )}
      <ModalAddProvider
        providerName={name}
        title={`Ключ ${name}`}
        opened={opened}
        onClose={toggle}
      />
    </Stack>
  );
};
