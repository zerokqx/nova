import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { CreateSourceDto } from './dto/create-source.dto';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { SourceEntity, SourceFullEntity } from './entites/source.entity';

@Controller('sources')
// @UseDataInterceptor()
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) { }

  @Post()
  @ApiOperation({ summary: 'Создать источник' })
  @ApiCreatedResponse({
    type: SourceEntity,
  })
  async create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourcesService.create(createSourceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Все источники' })
  @ApiOkResponse({
    type: SourceEntity,
    isArray: true,
  })
  async findAll() {
    return await this.sourcesService.findAll();
  }

  @Get('full')
  @ApiOperation({ summary: 'Все источники с моделями' })
  @ApiOkResponse({
    type: SourceFullEntity,
    isArray: true,
  })
  async full() {
    return await this.sourcesService.full();
  }

  @Get('full/:id')
  @ApiParam({ name: 'id', example: '1' })
  @ApiOperation({ summary: 'Источник с моделями по ID' })
  @ApiOkResponse({
    type: SourceFullEntity,
  })
  @ApiNotFoundResponse({ description: 'Источник не найден' })
  async fullById(@Param('id') id: string) {
    return await this.sourcesService.fullById({ id: +id });
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1' })
  @ApiOperation({ summary: 'Источник по ID' })
  @ApiOkResponse({
    type: SourceEntity,
  })
  @ApiNotFoundResponse({ description: 'Источник не найден' })
  async findOne(@Param('id') id: string) {
    return await this.sourcesService.findOne({ id: +id });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '1' })
  @ApiOperation({ summary: 'Удалить источник' })
  @ApiOkResponse({
    type: SourceEntity,
  })
  @ApiNotFoundResponse({ description: 'Источник не найден' })
  async remove(@Param('id') id: string) {
    return await this.sourcesService.remove({ where: { id: +id } });
  }
}
