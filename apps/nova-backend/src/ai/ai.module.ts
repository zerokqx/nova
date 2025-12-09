import { Module, Scope } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiUtils } from './ai.utils';
import { PerplexityService } from './perplexity/perplexity.service';

@Module({
  controllers: [AiController],
  providers: [AiUtils, PerplexityService],
})
export class AiModule {}
