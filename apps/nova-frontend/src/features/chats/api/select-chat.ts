import { $api, $apiFetch } from '@/shared/api/client';
import { components } from '@/shared/types/schema';

/**
 * @description Сначало необходимо выбрать чат с помощью хука useSelectedChatStore
 */
export const useSelectChat = (
  id: components['schemas']['ChatEntity']['id']
) => {
  return $api.useQuery(
    'get',
    '/api/chats/select/{id}',
    { params: { path: { id: id ?? '' } } },
    { staleTime: 1000, enabled: !!id }
  );
};

export const selectChatFetch = async (
  id: components['schemas']['ChatEntity']['id']
) => {
  return $apiFetch.GET('/api/chats/select/{id}', {
    params: {
      path: { id },
    },
  });
};
