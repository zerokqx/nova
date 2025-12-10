import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UseDataInterceptor } from '@moduleShared/data/data.interceptor';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('sources')
@UseDataInterceptor()
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) { }

  @Post()
  @ApiOperation({ summary: 'Создать источник' })
  @ApiCreatedResponse({
    schema: {
      example: {
        data: {
          id: 1,
          name: 'OpenAI',
          apiUrl: 'https://api.openai.com',
          createdAt: '2025-12-10T12:00:00Z',
        },
      },
    },
  })
  async create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourcesService.create(createSourceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Все источники' })
  @ApiOkResponse({
    schema: {
      example: {
        data: [
          { id: 1, name: 'OpenAI' },
          { id: 2, name: 'Perplexity' },
        ],
      },
    },
  })
  async findAll() {
    return await this.sourcesService.findAll();
  }

  @Get('full')
  @ApiOperation({ summary: 'Все источники с моделями' })
  @ApiOkResponse({
    schema: {
      example: {
        data: [
          {
            id: 1,
            name: 'OpenAI',
            models: [{ id: 1, name: 'gpt-4' }],
          },
        ],
      },
    },
  })
  async full() {
    return await this.sourcesService.full();
  }

  @Get('full/:id')
  @ApiParam({ name: 'id', example: '1' })
  @ApiOperation({ summary: 'Источник с моделями по ID' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          name: 'OpenAI',
          models: [{ id: 1, name: 'gpt-4' }],
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Источник не найден' })
  async fullById(@Param('id') id: string) {
    return await this.sourcesService.fullById({ id: +id });
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1' })
  @ApiOperation({ summary: 'Источник по ID' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          name: 'OpenAI',
          apiUrl: 'https://api.openai.com',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Источник не найден' })
  async findOne(@Param('id') id: string) {
    return await this.sourcesService.findOne({ id: +id });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '1' })
  @ApiOperation({ summary: 'Удалить источник' })
  @ApiOkResponse({
    schema: {
      example: { data: { message: 'Источник удален' } },
    },
  })
  @ApiNotFoundResponse({ description: 'Источник не найден' })
  async remove(@Param('id') id: string) {
    return await this.sourcesService.remove({ where: { id: +id } });
  }
}
