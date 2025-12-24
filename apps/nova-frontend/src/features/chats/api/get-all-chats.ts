import { $api } from '@/shared/api/client';

export const useGetAllChats = () => {
  return $api.useQuery('get', '/api/chats/all', {}, { staleTime: 1000 });
};
