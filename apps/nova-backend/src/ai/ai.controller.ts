import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DataService } from '@/data/data.service';
import { PerplexityService } from './perplexity/perplexity.service';
import { SendDto } from './dto/send.dto';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: PerplexityService,
    private readonly data: DataService
  ) { }

  @Post('perplexity/:model')
  async send(@Body() body: SendDto, @Param('model') model: string) {
    console.log(body);
    const data = await this.aiService
      .with(body.apiKey)
      .send(body.content, model);
    return this.data.format(data);
  }
}
