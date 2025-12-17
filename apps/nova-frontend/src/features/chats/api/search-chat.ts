import { $api } from '@/shared/api/client';
import { components } from '@/shared/types/schema';

export const useSearchChat = (
  title: components['schemas']['ChatEntity']['title']
) => {
  return $api.useQuery('get', '/api/chats/search', {
    params: {
      query: {
        title,
      },
    },
  });
};
