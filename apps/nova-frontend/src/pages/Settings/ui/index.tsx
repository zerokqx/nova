import { useAddKey } from '@/features/keys/api/useAddKey';
import { useDeleteKey } from '@/features/keys/api/useDeleteKey';
import { AiCard } from '@/shared/ui/AiComponents/ui/AiCard/AiCard';
import { useGetSourcesFull } from '@features/sources/api/useGetSourcesFull';
import { AppShellMain, Group } from '@mantine/core';

export const SettingsPage = () => {
  const { data } = useGetSourcesFull();
  const { mutate: addKey } = useAddKey();
  const { mutate: deleteKey } = useDeleteKey();

  return (
    <AppShellMain h={'100dvh'}>
      <Group align="stretch">
        {data?.map((s) => (
          <AiCard dbRecordInstance={s}>
            <AiCard.Header>
              <AiCard.Header.Icon />
              <AiCard.Header.Title />
            </AiCard.Header>
            <AiCard.Models />
            <AiCard.Controls
              onCreate={({ id }, { value: { apiKey } }, { toggle }) => {
                addKey(
                  {
                    body: {
                      apiKey,
                      sourceId: id,
                    },
                  },
                  { onSuccess: toggle }
                );
              }}
              onDelete={(r) => {
                deleteKey({
                  params: {
                    path: {
                      id: String(r.key.id),
                    },
                  },
                });
              }}
            />
          </AiCard>
        ))}
      </Group>
    </AppShellMain>
  );
};
