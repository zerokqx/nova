import {
  ActionIcon,
  Button,
  ButtonGroup,
  Grid,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { useAiCard } from '../../../model/ustAiCardProvider';
import { ApiKeyModal } from '../../ModalApiKey/ApiKeyModal';
import { useToggle } from '@mantine/hooks';
import { ArrowUpDown, Trash } from 'lucide-react';
import { IAiCardComponent } from '../../types/AiCard.interface';

export const Controls: IAiCardComponent['Controls'] = ({
  onCreate,
  onDelete,
  onPut,
}) => {
  const r = useAiCard();

  const [opened, toggle] = useToggle();
  return (
    <Grid.Col span={12}>
      <Stack>
        {r.available ? (
          <>
            <Text c={'blue'} fw={600}>
              Провайдер готов к использованиею.
            </Text>
            <Group>
              <ActionIcon color="dark.9">
                <ArrowUpDown size={16} />
              </ActionIcon>

              <ActionIcon
                color="red.9"
                onClick={() => {
                  onDelete?.(r);
                }}
              >
                <Trash size={16} />
              </ActionIcon>
            </Group>
          </>
        ) : (
          <>
            <Text c={'yellow'}> Недоступно</Text>
            <Button onClick={() => toggle()}>Создать API ключ</Button>
            <ApiKeyModal opened={opened} onClose={toggle}>
              <ApiKeyModal.Add
                onSubmit={(v) => {
                  onCreate?.(r, v, { toggle });
                }}
              />
            </ApiKeyModal>
          </>
        )}
      </Stack>
    </Grid.Col>
  );
};
