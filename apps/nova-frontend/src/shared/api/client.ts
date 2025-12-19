import { paths } from '@shared/types/schema';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-fetch';
import createClientQuery from 'openapi-react-query';

const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
});
export const $api = createClientQuery(fetchClient);
export const $apiOpt = $api.queryOptions;

export const $apiFetch = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
});
