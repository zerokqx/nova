import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  Post,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SourcesService } from '@modules/sources/sources.service';
import { Errors } from './ai.constants';

export const PROVIDER_NAME = Symbol.for('provider-name');
export const IS_PROVIDER = Symbol.for('is-handler-provider');

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
    if (!isProvider) {
      throw new InternalServerErrorException(Errors.IS_NOT_AI_PROVIDER);
    }

    const providerName = this.reflector.get<string>(PROVIDER_NAME, handler);
    if (!providerName) {
      throw new InternalServerErrorException(Errors.NOT_PROVIDER_NAME);
    }

    const apiKey = await this.sourceService.getApiViaNameSource(providerName);

    log.debug(`API: ${apiKey}`);
    if (!apiKey?.key?.apiKey) {
      throw new UnauthorizedException(Errors.WITHOUT_API_KEY);
    } else {
      context.switchToHttp().getRequest().apiKey = apiKey.key.apiKey;
      return true;
    }
  }
}
export const AiProvider = (
  providerName: Lowercase<string>,
  type: 'stream' | 'static',
  modelNameInPath = 'model'
) =>
  applyDecorators(
    UseGuards(ApiGuard),
    SetMetadata(PROVIDER_NAME, providerName),
    SetMetadata(IS_PROVIDER, true),
    Post(`${providerName}/:${modelNameInPath}/${type}`)
  );
