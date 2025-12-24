import { ActionIcon, Button, Grid, Group, Stack, Text } from '@mantine/core';
import { useAiCard } from '../../../model/ustAiCardProvider';
import { useToggle } from '@mantine/hooks';
import { ArrowUpDown, SquarePen, Trash } from 'lucide-react';
import { IAiCardComponent } from '../../types/AiCard.interface';
import { capitalize } from 'lodash';
import { ApiKeyModal } from '../../modal-api-key/ApiKeyModal';
import { Copy } from './Copy';

export const Controls: IAiCardComponent['Controls'] = ({
  renderForApiKey,
  renderForNotApiKey,
  children,
  callbacks: { onCreate, onDelete, onPut },
}) => {
  const r = useAiCard();

  const [openedAdd, toggleAdd] = useToggle();

  const [openedPatch, togglePatch] = useToggle();
  return (
    <Grid.Col span={12}>
      <Stack>
        {r.available ? (
          <>
            <Text c={'blue'} fw={600}>
              Провайдер готов к использованиею.
            </Text>
            <Group>
              {renderForApiKey}
              {children}
              <ActionIcon disabled color="dark.9">
                <ArrowUpDown size={16} />
              </ActionIcon>
              <ActionIcon color="dark.9" onClick={() => togglePatch()}>
                <SquarePen size={16} />
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
            <ApiKeyModal
              title={`Изменить ${capitalize(r.name)}`}
              opened={openedPatch}
              onClose={togglePatch}
            >
              <ApiKeyModal.Patch
                onSubmit={(v) => {
                  onPut?.(r, v, { toggle: togglePatch });
                }}
                current={r.key.apiKey}
              />
            </ApiKeyModal>
          </>
        ) : (
          <>
            <Text c={'yellow'}> Недоступно</Text>
            <Button onClick={() => toggleAdd()}>Создать API ключ</Button>
            {renderForNotApiKey}
            <ApiKeyModal
              title={`Добавить ключ для ${capitalize(r.name)}`}
              opened={openedAdd}
              onClose={toggleAdd}
            >
              <ApiKeyModal.Add
                onSubmit={(v) => {
                  onCreate?.(r, v, { toggle: toggleAdd });
                }}
              />
            </ApiKeyModal>
          </>
        )}
      </Stack>
    </Grid.Col>
  );
};
Controls.Copy = Copy;
