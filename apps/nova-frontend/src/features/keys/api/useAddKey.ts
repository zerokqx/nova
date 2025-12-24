import { $api } from '@/shared/api/client';
import { useQueryClient } from '@tanstack/react-query';
import { SOURCES_FULL } from './constants';

export const useAddKey = () => {
  const client = useQueryClient();
  return $api.useMutation('post', '/api/keys', {
    onSuccess: () => client.invalidateQueries(SOURCES_FULL),
  });
};
