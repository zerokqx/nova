import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KeysService } from './keys.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { UseDataInterceptor } from '@moduleShared/data/data.interceptor';
import {
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { KeysEntity } from './entities/key.entity';

@UseDataInterceptor()
@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Post()
  @ApiOperation({
    summary: 'Создать ключ',
    description: 'Создает новый API ключ',
  })
  @ApiCreatedResponse({ type: KeysEntity })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() createKeyDto: CreateKeyDto) {
    return this.keysService.create(createKeyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все ключи' })
  @ApiOkResponse({ type: KeysEntity, isArray: true })
  findAll() {
    return this.keysService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить ключ по ID' })
  @ApiParam({ name: 'id', description: 'ID ключа', example: 'uuid-123' })
  @ApiOkResponse({ type: KeysEntity })
  @ApiNotFoundResponse({ description: 'Ключ не найден' })
  findOne(@Param('id') id: string) {
    return this.keysService.findOne({ id: +id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить ключ' })
  @ApiParam({ name: 'id', description: 'ID ключа', example: 'uuid-123' })
  @ApiOkResponse({ type: KeysEntity })
  @ApiNotFoundResponse({ description: 'Ключ не найден' })
  update(@Param('id') id: string, @Body() updateKeyDto: UpdateKeyDto) {
    return this.keysService.update({ id: +id, updateKeyDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить ключ' })
  @ApiParam({ name: 'id', description: 'ID ключа', example: 'uuid-123' })
  @ApiOkResponse({ type: KeysEntity })
  @ApiNotFoundResponse({ description: 'Ключ не найден' })
  remove(@Param('id') id: string) {
    return this.keysService.remove({ where: { id: +id } });
  }
}
