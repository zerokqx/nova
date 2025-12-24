import { $api } from '@/shared/api/client';
import { useQueryClient } from '@tanstack/react-query';
import { SOURCES_FULL } from './constants';

export const useDeleteKey = () => {
  const client = useQueryClient();
  return $api.useMutation('delete', '/api/keys/{id}', {
    onSuccess: () => client.invalidateQueries(SOURCES_FULL),
  });
};
