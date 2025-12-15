import { $api } from '@/shared/api/client';

export const useGetModels = () => {
  return $api.useQuery('get', '/api/models/all/include/source', {});
};
