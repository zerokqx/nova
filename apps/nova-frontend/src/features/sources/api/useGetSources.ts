import { $api } from '@shared/api/client';

export const useGetSources = () => {
  const sources = $api.useQuery('get', '/api/sources');
  return sources;
};
