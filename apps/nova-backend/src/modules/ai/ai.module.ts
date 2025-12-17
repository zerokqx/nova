import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiUtils } from './ai.utils';
import { PerplexityService } from './perplexity/perplexity.service';
import { ApiGuard } from './ai.guard';
import { SourcesModule } from '@modules/sources/sources.module';
import { MessagesModule } from '@modules/messages/messages.module';

@Module({
  controllers: [AiController],
  imports: [SourcesModule, MessagesModule],
  providers: [AiUtils, PerplexityService, ApiGuard],
})
export class AiModule {}
