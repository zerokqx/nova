import { useAddKey } from '@/features/keys/api/useAddKey';
import { useDeleteKey } from '@/features/keys/api/useDeleteKey';
import { usePatchKey } from '@/features/keys/api/usePatchKey';
import { AiCard } from '@/shared/ui/AiComponents/ui/AiCard/AiCard';
import { useGetSourcesFull } from '@features/sources/api/useGetSourcesFull';
import { AppShellMain, Group } from '@mantine/core';

export const SettingsPage = () => {
  const { data } = useGetSourcesFull();
  const { mutate: patchKey } = usePatchKey();
  const { mutate: addKey } = useAddKey();
  const { mutate: deleteKey } = useDeleteKey();

  return (
    <AppShellMain h={'100dvh'}>
      <Group align="stretch">
        {data?.map((s) => (
          <AiCard key={s.id} dbRecordInstance={s}>
            <AiCard.Header>
              <AiCard.Header.Icon />
              <AiCard.Header.Title />
            </AiCard.Header>
            <AiCard.Models />
            <AiCard.Controls
              onPut={(r, f, m) => {
                patchKey(
                  {
                    body: {
                      apiKey: f.value.apiKey,
                    },
                    params: {
                      path: {
                        id: String(r.key.id),
                      },
                    },
                  },
                  { onSuccess: m.toggle }
                );
              }}
              onCreate={(r, f, m) => {
                addKey(
                  {
                    body: {
                      apiKey: f.value.apiKey,
                      sourceId: r.id,
                    },
                  },
                  { onSuccess: m.toggle }
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
