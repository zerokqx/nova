import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Errors } from './ai.constants';

@Injectable()
export class ApiGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.body.apiKey;
    const length = apiKey?.length && apiKey.length > 10;
    if (!length) throw new UnprocessableEntityException(Errors.WITHOUT_API_KEY);
    return length;
  }
}
export const UseApiGuard = () => applyDecorators(UseGuards(ApiGuard));
