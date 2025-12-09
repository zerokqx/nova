import { Body, Controller, Param, Post } from '@nestjs/common';
import { PerplexityService } from './perplexity/perplexity.service';
import { SendDto } from './dto/send.dto';
import { UseApiGuard } from './ai.guard';
import { UseDataInterceptor } from '@/data/data.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('ai')
@UseDataInterceptor()
export class AiController {
  constructor(private readonly aiService: PerplexityService) {}

  @ApiOperation({
    summary: 'Отправить сообщение',
    description: 'Отправить сообзение для провайдера Perplexity',
  })
  @ApiResponse({
    status: '2XX',
    schema: {
      example: {
        data: {
          content: 'content',
          role: 'role',
        },
      },
    },
  })
  @UseApiGuard()
  @Post('perplexity/:model')
  async send(@Body() body: SendDto, @Param('model') model: string) {
    return await this.aiService.with(body.apiKey).send(body.content, model);
  }
}
