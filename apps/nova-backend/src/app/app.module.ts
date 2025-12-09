import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ModelModule } from '@/model/model.module';
import { DataModule } from '@/data/data.module';
import { SourcesModule } from '@/sources/sources.module';
import { KeysModule } from '@/keys/keys.module';
import { AiModule } from '@/ai/ai.module';

@Module({
  imports: [
    PrismaModule,
    ModelModule,
    DataModule,
    SourcesModule,
    KeysModule,
    AiModule,
  ],
})
export class AppModule {}
