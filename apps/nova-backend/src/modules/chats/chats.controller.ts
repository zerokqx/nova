import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatEntity } from './entities/chats.entity';
import { chat } from '@/generated/prisma/client';
import { DeleteManyChatDto } from './dto/delete-many.dto';
import { ChatIncludeRelationEntity } from './entities/chats-include-relation.entity';

@ApiTags('Сhats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Delete('/delete_many')
  @ApiOperation({ summary: 'Удаляет чаты коотрые были переданы в body.ids' })
  delete(@Body() body: DeleteManyChatDto) {
    return this.chatsService.deleteManyChat(body.ids);
  }
  @Post()
  @ApiOperation({ summary: 'Создать новый чат' })
  @ApiOkResponse({ type: ChatEntity })
  create(@Body() body: CreateChatDto) {
    return this.chatsService.create(body);
  }

  @Get('all')
  @ApiOkResponse({ type: ChatEntity, isArray: true })
  findMany() {
    return this.chatsService.findMany();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Получить чат по ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID чата',
    required: true,
    format: 'cuid',
  })
  @ApiOkResponse({ type: ChatEntity })
  chat(@Param('id') id: chat['id']) {
    return this.chatsService.findByid(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить чат по ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID чата',
    required: true,
    format: 'cuid',
  })
  @ApiOkResponse({ type: ChatEntity })
  deleteChat(@Param('id') id: chat['id']) {
    return this.chatsService.delete(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Найти чаты по title' })
  @ApiQuery({
    name: 'title',
    required: true,
    description: 'Подстрока для поиска по названию чата',
  })
  @ApiOkResponse({ type: ChatEntity })
  findByTitle(@Query('title') title: chat['title']) {
    return this.chatsService.findByKeyWord({ title: { contains: title } });
  }

  @Get('select/:id')
  @ApiOperation({ summary: 'Выбрать чат (например, сделать активным)' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID чата',
    required: true,
    format: 'cuid',
  })
  @ApiOkResponse({ type: ChatIncludeRelationEntity })
  select(@Param('id') id: chat['id']) {
    return this.chatsService.selectChat(id);
  }
}
