import { useAddKey } from '@/features/keys/api/useAddKey';
import { useDeleteKey } from '@/features/keys/api/useDeleteKey';
import { usePatchKey } from '@/features/keys/api/usePatchKey';
import { useGetSourcesFull } from '@/features/sources/api/useGetSourcesFull';
import { AiCard } from '@/shared/ui/ai-components/ui/ai-card/AiCard';

export const AiCardBlock = () => {
  const { data } = useGetSourcesFull();
  const { mutate: patchKey } = usePatchKey();
  const { mutate: addKey } = useAddKey();
  const { mutate: deleteKey } = useDeleteKey();

  return data?.map((s) => (
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
              { onSuccess: m.toggle }
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
              { onSuccess: m.toggle }
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
        renderForApiKey={[<AiCard.Controls.Copy value={s.key?.apiKey} />]}
      />
    </AiCard>
  ));
};
