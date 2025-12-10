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
}
