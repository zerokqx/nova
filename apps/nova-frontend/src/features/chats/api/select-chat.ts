import { $api } from '@/shared/api/client';
import { useSelectedChatStore } from '../model/select-chat.store';

/**
 * @description Сначало необходимо выбрать чат с помощью хука useSelectedChatStore
 */
export const useSelectChat = () => {
  const id = useSelectedChatStore((s) => s.data);
  return $api.useQuery(
    'get',
    '/api/chats/select/{id}',
    { params: { path: { id: id ?? '' } } },
    { staleTime: 1000, enabled: Boolean(id) }
  );
};
