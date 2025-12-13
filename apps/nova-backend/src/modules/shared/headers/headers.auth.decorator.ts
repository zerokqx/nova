import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const Bearer = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const log = new Logger(Bearer.name);
    const request = ctx.switchToHttp().getRequest();
    log.debug(`API: ${request.apiKey}`);

    return request.apiKey;
  }
);

export type TBearer<T extends string = string> = `Bearer ${T}`;
export interface TBearerEntity<T extends string = string> {
  full: TBearer<T>;
  token: T;
}
