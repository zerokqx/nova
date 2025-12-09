import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { DataService } from './data.service';

@Injectable()
export class DataInterceptor implements NestInterceptor {
  constructor(private formater: DataService) {}
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data) => this.formater.format(data)));
  }
}

export const UseDataInterceptor = () =>
  applyDecorators(UseInterceptors(DataInterceptor));
