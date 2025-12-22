import { $api, $apiOpt, queryClient } from '@/shared/api/client';
import { Chat } from '@pages/Chat/ui/Chat';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/$id')({
  component: Chat,
  loader: async ({ params: { id } }) =>
    queryClient.ensureQueryData(
      $apiOpt('get', '/api/chats/select/{id}', {
        params: {
          path: {
            id,
          },
        },
      }),
    ),
});
