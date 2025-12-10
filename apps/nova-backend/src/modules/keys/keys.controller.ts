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

@UseDataInterceptor()
@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Post()
  @ApiOperation({
    summary: 'Создать ключ',
    description: 'Создает новый API ключ',
  })
  @ApiCreatedResponse({
    description: 'Ключ успешно создан',
    schema: {
      example: {
        data: {
          id: 'uuid-123',
          name: 'My API Key',
          key: 'sk-1234567890abcdef',
          createdAt: '2025-12-10T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() createKeyDto: CreateKeyDto) {
    return this.keysService.create(createKeyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все ключи' })
  @ApiOkResponse({
    description: 'Список ключей',
    schema: {
      example: {
        data: [
          { id: 'uuid-1', name: 'Key 1', createdAt: '2025-12-10T12:00:00Z' },
          { id: 'uuid-2', name: 'Key 2', createdAt: '2025-12-10T12:01:00Z' },
        ],
      },
    },
  })
  findAll() {
    return this.keysService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить ключ по ID' })
  @ApiParam({ name: 'id', description: 'ID ключа', example: 'uuid-123' })
  @ApiOkResponse({
    description: 'Ключ найден',
    schema: {
      example: {
        data: {
          id: 'uuid-123',
          name: 'My API Key',
          key: 'sk-1234567890abcdef',
          createdAt: '2025-12-10T12:00:00Z',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Ключ не найден' })
  findOne(@Param('id') id: string) {
    return this.keysService.findOne({ id: +id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить ключ' })
  @ApiParam({ name: 'id', description: 'ID ключа', example: 'uuid-123' })
  @ApiOkResponse({
    description: 'Ключ обновлен',
    schema: {
      example: {
        data: {
          id: 'uuid-123',
          name: 'Updated Key Name',
          updatedAt: '2025-12-10T12:05:00Z',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Ключ не найден' })
  update(@Param('id') id: string, @Body() updateKeyDto: UpdateKeyDto) {
    return this.keysService.update({ id: +id, updateKeyDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить ключ' })
  @ApiParam({ name: 'id', description: 'ID ключа', example: 'uuid-123' })
  @ApiOkResponse({
    description: 'Ключ удален',
    schema: {
      example: { data: { message: 'Ключ успешно удален' } },
    },
  })
  @ApiNotFoundResponse({ description: 'Ключ не найден' })
  remove(@Param('id') id: string) {
    return this.keysService.remove({ where: { id: +id } });
  }
}
