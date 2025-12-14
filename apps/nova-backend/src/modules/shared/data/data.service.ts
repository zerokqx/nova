import { SourceEntity } from '@modules/sources/entites/source.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  format<T, M extends string | undefined>(
    data: T,
    message?: M
  ): { data: T; message?: M } {
    return {
      data,
      message,
    };
  }
  static forSwagger<Entity extends new () => any, M extends string | undefined>(
    data: Entity,
    message?: M
  ) {
    return {
      data,
      message,
    };
  }
}
