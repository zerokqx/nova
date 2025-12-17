import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { UseDataInterceptor } from '@modules/shared/data/data.interceptor';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesEntity } from './entities/messages.entity';

@UseDataInterceptor()
@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  @ApiOperation({ summary: 'Создать новое сообщение' })
  @ApiOkResponse({ type: MessagesEntity })
  create(@Body() { chatId, ...body }: CreateMessageDto) {
    return this.messagesService.create({
      chat: { connect: { id: chatId } },
      ...body,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить все сообщения для чата' })
  @ApiParam({ name: 'id', type: Number, description: 'ID чата' })
  @ApiOkResponse({ type: MessagesEntity, isArray: true })
  allForChat(@Param('id') id: string) {
    return this.messagesService.getAllMessagesForChat(id);
  }
}
