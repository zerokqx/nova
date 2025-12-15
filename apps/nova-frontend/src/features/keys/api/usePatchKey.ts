import { $api } from '@/shared/api/client';
import { useQueryClient } from '@tanstack/react-query';
import { SOURCES_FULL } from './constants';

export const usePatchKey = () => {
  const client = useQueryClient();
  return $api.useMutation('patch', '/api/keys/{id}', {
    onSuccess: () => client.invalidateQueries(SOURCES_FULL),
  });
};
