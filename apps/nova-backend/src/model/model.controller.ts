import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { DataService } from '@/data/data.service';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('models')
export class ModelController {
  constructor(
    private readonly modelService: ModelService,
    private data: DataService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создать модель' })
  @ApiCreatedResponse({
    schema: { example: { data: { id: 1, name: 'Model' } } },
  })
  async create(@Body() modelsDto: CreateModelDto) {
    try {
      const result = await this.modelService.createModel(modelsDto);
      return this.data.format(result);
    } catch {
      throw new InternalServerErrorException('Не удалось создать модель');
    }
  }

  @Get('all/include/source')
  @ApiOperation({ summary: 'Все модели с источниками' })
  @ApiOkResponse({ schema: { example: { data: [] } } })
  async getAllIncludeSouce() {
    try {
      const data = await this.modelService.getAllIncludeSources();
      return this.data.format(data);
    } catch {
      throw new InternalServerErrorException(
        'Ошибка при получении моделей с источниками'
      );
    }
  }

  @Get('count')
  @ApiOperation({ summary: 'Количество моделей' })
  @ApiOkResponse({ schema: { example: { data: { count: 42 } } } })
  async getCount() {
    try {
      const count = await this.modelService.getCount();
      return this.data.format({ count });
    } catch {
      throw new InternalServerErrorException(
        'Ошибка при получении количества моделей'
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Все модели' })
  @ApiOkResponse({ schema: { example: { data: [] } } })
  async getAll() {
    try {
      const data = await this.modelService.getAll();
      return this.data.format(data);
    } catch {
      throw new InternalServerErrorException(
        'Ошибка при получении списка моделей'
      );
    }
  }

  @Get('notation/:id')
  @ApiParam({ name: 'id', example: '1' })
  @ApiOperation({ summary: 'Нотация по ID источника' })
  @ApiOkResponse({ schema: { example: { data: [] } } })
  @ApiNotFoundResponse({ description: 'Нотация не найдена' })
  async notation(@Param('id') id: string) {
    try {
      const data = await this.modelService.getForSourceWithNotation({
        source_id: +id,
      });
      if (!data || data.length === 0) {
        throw new NotFoundException(
          `Нотация для источника с ID ${+id} не найдена`
        );
      }
      return this.data.format(data);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Ошибка при получении нотации');
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1' })
  @ApiOperation({ summary: 'Модель по ID' })
  @ApiOkResponse({ schema: { example: { data: { id: 1, name: 'Model' } } } })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  async getOne(@Param('id') id: string) {
    try {
      const model = await this.modelService.getById({ id: +id });
      if (!model) {
        throw new NotFoundException(`Модель с ID ${+id} не найдена`);
      }
      return this.data.format(model);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Ошибка при получении модели');
    }
  }
}
