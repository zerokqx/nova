import { $api } from '@/shared/api/client';

export const useCreateMessage = () => {
  return $api.useMutation('post', '/api/messages');
};
