import { $api } from '@/shared/api/client';
import { useQueryClient } from '@tanstack/react-query';
import { CHAT_ALL } from './const';

export const useDeleteChat = () => {
  const client = useQueryClient();
  return $api.useMutation('delete', '/api/chats/{id}', {
    onSuccess: () => client.invalidateQueries(CHAT_ALL),
  });
};

export const useDeleteManyChat = () => {
  const client = useQueryClient();
  return $api.useMutation('delete', '/api/chats/delete_many', {
    onSuccess: () => client.invalidateQueries(CHAT_ALL),
  });
};
