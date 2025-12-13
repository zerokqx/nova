import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { UseDataInterceptor } from '@modules/shared/data/data.interceptor';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateInitialMessageDto } from './dto/initial-create-message.dto';

@UseDataInterceptor()
@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  @ApiOperation({ summary: 'Создать новое сообщение' })
  @ApiResponse({ status: 201, description: 'Сообщение успешно создано' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body, body.chatId);
  }

  @Post('initial')
  @ApiOperation({ summary: 'Создать начальное сообщение для чата' })
  @ApiBody({
    type: CreateMessageDto,
    description: 'chatId обязателен, content — текст сообщения',
  })
  @ApiResponse({ status: 201, description: 'Начальное сообщение создано' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  initial(@Body() { chatId, content }: CreateInitialMessageDto) {
    return this.messagesService.createInitial({ content }, chatId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить все сообщения для чата' })
  @ApiParam({ name: 'id', type: Number, description: 'ID чата' })
  @ApiResponse({
    status: 200,
    description: 'Список сообщений для указанного чата',
  })
  @ApiResponse({ status: 404, description: 'Чат не найден' })
  allForChat(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.getAllMessagesForChat(id);
  }
}
