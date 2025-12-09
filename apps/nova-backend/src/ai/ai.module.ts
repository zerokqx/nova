import { Module, Scope } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AiUtils } from './ai.utils';
import { PerplexityService } from './perplexity/perplexity.service';

@Module({
  controllers: [AiController],
  providers: [AiService, AiUtils, PerplexityService],
})
export class AiModule { }
