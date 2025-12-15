import { $api } from '@/shared/api/client';

export const useGetAvailableIncludeSoruce = () => {
  return $api.useQuery('get', '/api/models/avalible/incluede/source');
};
