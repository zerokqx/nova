import { $api } from '@/shared/api/client';
import { useQueryClient } from '@tanstack/react-query';
import { CHAT_ALL } from './const';

export const useCreateChat = () => {
  const client = useQueryClient();
  return $api.useMutation('post', '/api/chats', {
    onSuccess: () => client.invalidateQueries(CHAT_ALL),
  });
};
