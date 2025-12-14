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
import { DataService } from '@moduleShared/data/data.service';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ModelErrors } from './model.constants';
import { ModelEntity, ModelEntityIncludeSource } from './entites/model.entity';

@Controller('models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  @ApiOperation({ summary: 'Создать модель' })
  @ApiCreatedResponse({
    type: ModelEntity,
  })
  async create(@Body() data: CreateModelDto) {
    try {
      return this.modelService.createModel(data);
    } catch {
      throw new InternalServerErrorException(
        ModelErrors.COULDNT_CREATE_A_MODELS
      );
    }
  }

  @Get('all/include/source')
  @ApiOperation({ summary: 'Все модели с источниками' })
  @ApiOkResponse({ type: ModelEntityIncludeSource, isArray: true })
  async getAllIncludeSouce() {
    try {
      return this.modelService.getAllIncludeSources();
    } catch {
      throw new InternalServerErrorException(
        ModelErrors.WHEN_GETTING_MODELS_WITH_SOURCES
      );
    }
  }

  @Get('count')
  @ApiOperation({ summary: 'Количество моделей' })
  @ApiOkResponse({ type: Number })
  async getCount() {
    try {
      return this.modelService.getCount();
    } catch {
      throw new InternalServerErrorException(ModelErrors.WHER_GETTING_NUMBER);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Все модели' })
  @ApiOkResponse({ type: ModelEntity, isArray: true })
  async getAll() {
    try {
      return this.modelService.getAll();
    } catch {
      throw new InternalServerErrorException(
        ModelErrors.WHER_GETTING_LIST_MODELS
      );
    }
  }

  @Get('notation/:id')
  @ApiParam({ name: 'id', example: '1', type: 'number' })
  @ApiOperation({ summary: 'Нотация по ID источника' })
  @ApiOkResponse({ type: String, isArray: true })
  @ApiNotFoundResponse({ description: 'Нотация не найдена' })
  async notation(@Param('id') id: string) {
    try {
      const data = await this.modelService.getForSourceWithNotation({
        sourceId: +id,
      });
      if (!data || data.length === 0) {
        throw new NotFoundException(
          `Нотация для источника с ID ${+id} не найдена`
        );
      }
      return data;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Ошибка при получении нотации');
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1' })
  @ApiOperation({ summary: 'Модель по ID' })
  @ApiOkResponse({ type: ModelEntity })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  async getOne(@Param('id') id: string) {
    try {
      const model = await this.modelService.getById({ id: +id });
      if (!model) {
        throw new NotFoundException(ModelErrors.ID_ERROR);
      }
      return model;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        ModelErrors.WHEN_EXPLAINING_THE_MODEL
      );
    }
  }
}
