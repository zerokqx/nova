import { Global, Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataInterceptor } from './data.interceptor';

@Global()
@Module({
  providers: [DataService, DataInterceptor],
  exports: [DataService],
})
export class DataModule {}
