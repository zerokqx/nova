import { $api } from '@shared/api/client';

export const useGetSourcesFull = () => {
  return $api.useQuery('get', '/api/sources/full', {});
};
