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
import { UseDataInterceptor } from '@moduleShared/data/data.interceptor';
import { ModelErrors } from './model.constants';

@UseDataInterceptor()
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
  @ApiOkResponse({ schema: { example: { data: [] } } })
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
  @ApiOkResponse({ schema: { example: { data: { count: 42 } } } })
  async getCount() {
    try {
      return this.modelService.getCount();
    } catch {
      throw new InternalServerErrorException(ModelErrors.WHER_GETTING_NUMBER);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Все модели' })
  @ApiOkResponse({ schema: { example: { data: [] } } })
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
  @ApiParam({ name: 'id', example: '1' })
  @ApiOperation({ summary: 'Нотация по ID источника' })
  @ApiOkResponse({ schema: { example: { data: [] } } })
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
        throw new NotFoundException(ModelErrors.ID_ERROR);
      }
      return this.data.format(model);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        ModelErrors.WHEN_EXPLAINING_THE_MODEL
      );
    }
  }
}
