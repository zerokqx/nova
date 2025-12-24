import { $api } from '@/shared/api/client';

export const useGetChat = () => {
  return $api.useMutation('get', '/api/chats/{id}');
};
