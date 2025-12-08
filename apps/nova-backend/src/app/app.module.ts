import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { ModelModule } from '@/model/model.module';
import { DataModule } from '@/data/data.module';
import { SourcesModule } from '@/sources/sources.module';
import { KeysModule } from '@/keys/keys.module';

@Module({
  imports: [PrismaModule, ModelModule, DataModule, SourcesModule, KeysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
