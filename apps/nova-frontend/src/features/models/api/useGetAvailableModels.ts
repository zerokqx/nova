import { $api } from '@/shared/api/client';
import { map } from 'lodash';

export const useGetAvailable = () => {
  return $api.useQuery(
    'get',
    '/api/models/avalible',
    {},
    { select: (data) => map(data, (obj) => ({ name: obj.name })) }
  );
};
