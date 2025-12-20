import { useAddKey } from '@/features/keys/api/useAddKey';
import { useDeleteKey } from '@/features/keys/api/useDeleteKey';
import { usePatchKey } from '@/features/keys/api/usePatchKey';
import { useGetSourcesFull } from '@/features/sources/api/useGetSourcesFull';
import { AiCard } from '@/shared/ui/ai-components/ui/ai-card/AiCard';
import { ErrorMessage } from '@/shared/ui/message-blocs';
import { Button, Center, Loader } from '@mantine/core';
import { AlertCircle } from 'lucide-react';

export const AiCardBlock = () => {
  const { data, isLoading, isError, refetch } = useGetSourcesFull();
  const { mutate: patchKey } = usePatchKey();
  const { mutate: addKey } = useAddKey();
  const { mutate: deleteKey } = useDeleteKey();

  if (isLoading) {
    return (
      <Center w={'100%'}>
        <Loader />
      </Center>
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        leftSection={<AlertCircle />}
        center
        message="Не удалось загрузить список провайдеров"
      >
        <Button onClick={() => refetch()} color="red" variant="light">
          Попробовать еще раз
        </Button>
      </ErrorMessage>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <>
      {data.map((s) => (
        <AiCard key={s.id} sources={s}>
          <AiCard.Header>
            <AiCard.Header.Icon />
            <AiCard.Header.Title />
          </AiCard.Header>

          <AiCard.Models />
          <AiCard.Remarks title />
          <AiCard.BestUseCases title />

          <AiCard.Controls
            callbacks={{
              onPut: (r, f, m) => {
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
                  { onSuccess: m.toggle },
                );
              },
              onCreate: (r, f, m) => {
                addKey(
                  {
                    body: {
                      apiKey: f.value.apiKey,
                      sourceId: r.id,
                    },
                  },
                  { onSuccess: m.toggle },
                );
              },
              onDelete: (r) => {
                deleteKey({
                  params: {
                    path: {
                      id: String(r.key.id),
                    },
                  },
                });
              },
            }}
            renderForApiKey={[<AiCard.Controls.Copy key={s.id} value={s.key?.apiKey} />]}
          />
        </AiCard>
      ))}
    </>
  );
};
