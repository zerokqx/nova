import { paths } from '@shared/types/schema';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-fetch';
import createClientQuery from 'openapi-react-query';
const fetchClient = createFetchClient<paths>({
  baseUrl: 'http://localhost:3000/',
});
export const $api = createClientQuery(fetchClient);
export const $apiOpt = $api.queryOptions;

export const $apiFetch = createClient<paths>({
  baseUrl: 'http://localhost:3000/',
});
