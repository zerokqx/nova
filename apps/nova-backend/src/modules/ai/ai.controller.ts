import { Body, Controller, Logger, Param, Post, Res } from '@nestjs/common';
import { PerplexityService } from './perplexity/perplexity.service';
import { SendDto } from './dto/send.dto';
import { AiProvider } from './ai.guard';
import { UseDataInterceptor } from '@moduleShared/data/data.interceptor';
import { convertToModelMessages } from 'ai';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Bearer } from '@modules/shared/headers/headers.auth.decorator';
import { MessagesService } from '@modules/messages/messages.service';
import { create } from 'domain';
import { Prisma } from '@/generated/prisma/client';
import { lstat } from 'fs';

@ApiTags('AI')
@Controller('ai')
@UseDataInterceptor()
export class AiController {
  constructor(
    private aiService: PerplexityService,
    private messageServcie: MessagesService
  ) {}

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

  @AiProvider('perplexity', 'stream')
  async ppls(
    @Body() body: SendDto,
    @Param('model') model: string,
    @Res() res: Response,
    @Bearer() token: string
  ) {
    const log = new Logger();

    log.log(body);
    const result = this.aiService
      .with(token)
      .streamWithMessagesArray(convertToModelMessages(body.messages), model);

    const createMsg = this.messageServcie;

    return result.pipeUIMessageStreamToResponse(res, {
      async onFinish(r) {
        // последнее сообщение в body.messages — тот user, который только что отправил запрос
        const userMessage = body.messages[body.messages.length - 1];
        const assistantMessage = r.responseMessage;

        await createMsg.create({
          metadata: (userMessage.metadata ?? {}) as Prisma.InputJsonObject,
          parts: userMessage.parts as Prisma.InputJsonObject[],
          role: userMessage.role, // 'user'
          chat: { connect: { id: body.id } },
        });

        await createMsg.create({
          metadata: (assistantMessage.metadata ?? {}) as Prisma.InputJsonObject,
          parts: assistantMessage.parts as Prisma.InputJsonObject[],
          role: assistantMessage.role, // 'assistant'
          chat: { connect: { id: body.id } },
        });
      },
    });
  }
}
