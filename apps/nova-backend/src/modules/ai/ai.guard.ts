import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SourcesService } from '@modules/sources/sources.service';

export const PROVIDER_NAME = 'provider-name' as const;
export const IS_PROVIDER = 'is-handler-provider' as const;

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(
    private sourceService: SourcesService,

    private reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const log = new Logger(ApiGuard.name);
    const handler = context.getHandler();
    const isProvider = this.reflector.get<boolean>(IS_PROVIDER, handler);
    if (!isProvider) return false;

    const providerName = this.reflector.get<string>(PROVIDER_NAME, handler);

    if (!providerName) return false;

    const apiKey = await this.sourceService.getApiViaNameSource(providerName);
    log.debug(`API: ${apiKey}`);
    if (apiKey?.key?.apiKey) {
      context.switchToHttp().getRequest().apiKey = apiKey.key.apiKey;
      return true;
    }
    return false;
  }
}
export const AiProvider = (
  providerName: string,
  type: 'stream' | 'static',
  modelNameInPath = 'model'
) =>
  applyDecorators(
    UseGuards(ApiGuard),
    SetMetadata(PROVIDER_NAME, providerName),
    SetMetadata(IS_PROVIDER, true),
    Post(`${providerName}/:${modelNameInPath}/${type}`)
  );
