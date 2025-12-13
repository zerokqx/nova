import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { PerplexityService } from './perplexity/perplexity.service';
import { SendDto } from './dto/send.dto';
import { AiProvider } from './ai.guard';
import { UseDataInterceptor } from '@moduleShared/data/data.interceptor';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  Bearer,
  TBearerEntity,
} from '@modules/shared/headers/headers.auth.decorator';

@ApiTags('AI')
@Controller('ai')
@UseDataInterceptor()
export class AiController {
  constructor(private aiService: PerplexityService) { }

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
  @AiProvider('perplexity', 'static')
  async send(
    @Body() body: SendDto,
    @Param('model') model: string,
    @Bearer() token: string
  ) {
    return await this.aiService.with(token).send(body.content, model);
  }

  @ApiBearerAuth()
  @AiProvider('perplexity', 'stream')
  async ppls(
    @Body() body: SendDto,
    @Param('model') model: string,
    @Res() res: Response,
    @Bearer() token: string
  ) {
    return this.aiService
      .with(token)
      .stream(body.content, model)
      .pipeUIMessageStreamToResponse(res);
  }
}
