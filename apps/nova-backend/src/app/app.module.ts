import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SourcesController } from './sources.controller';
import { ModelService } from './model.service';
import { PrismaService } from './prisma.service';

@Module({

  imports: [],
  controllers: [AppController, SourcesController],
  providers: [AppService, ModelService, PrismaService],
})
export class AppModule {}
