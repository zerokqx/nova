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
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { UseDataInterceptor } from '@modules/shared/data/data.interceptor';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('chats')
@UseDataInterceptor()
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый чат' })
  @ApiBody({ type: CreateChatDto })
  @ApiResponse({ status: 201, description: 'Чат создан' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  create(@Body() body: CreateChatDto) {
    return this.chatsService.create(body);
  }

  @Get('all')
  @ApiOperation({ summary: 'Получить список всех чатов' })
  @ApiResponse({ status: 200, description: 'Список чатов' })
  findMany() {
    return this.chatsService.findMany();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Получить чат по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID чата' })
  @ApiResponse({ status: 200, description: 'Чат найден' })
  @ApiResponse({ status: 404, description: 'Чат не найден' })
  chat(@Param('id', ParseIntPipe) id: number) {
    return this.chatsService.findByid(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить чат по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID чата' })
  @ApiResponse({ status: 200, description: 'Чат удалён' })
  @ApiResponse({ status: 404, description: 'Чат не найден' })
  deleteChat(@Param('id', ParseIntPipe) id: number) {
    return this.chatsService.delete(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Найти чаты по title' })
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Подстрока для поиска по названию чата',
  })
  @ApiResponse({ status: 200, description: 'Список подходящих чатов' })
  findByTitle(@Query('title') title: string) {
    return this.chatsService.findByKeyWord({ title: { contains: title } });
  }

  @Get('select/:id')
  @ApiOperation({ summary: 'Выбрать чат (например, сделать активным)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID чата' })
  @ApiResponse({ status: 200, description: 'Чат выбран' })
  @ApiResponse({ status: 404, description: 'Чат не найден' })
  select(@Param('id', ParseIntPipe) id: number) {
    return this.chatsService.selectChat(id);
  }
}
