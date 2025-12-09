import { TRoles } from './role.type';
import { TProviderModelsNotation } from './providers.type';

export interface IProviderSendResponse {
  role: TRoles;
  length: number;
  text: string;
  provider: TProviderModelsNotation;
}
export type IWithArgs = [apiKey: string];
