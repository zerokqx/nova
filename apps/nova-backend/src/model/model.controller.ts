import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  PreconditionFailedException,
  BadRequestException,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';

@Controller('models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  create(@Body() modelsDto: CreateModelDto) {
    return this.modelService.createModel(modelsDto);
  }

  @Get('count')
  async getCount() {
    return this.modelService.getCount();
  }
  @Get('all')
  async getAll() {
    return this.modelService.getAll();
  }

  @Get('notation/:id')
  async notation(@Param('id') id: string) {
    const data = await this.modelService.getForSourceWithNotation({
      source_id: parseInt(id),
    });
    if (data.length <= 0) throw new PreconditionFailedException();
    return data;
  }
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const idNumber = parseInt(id, 10);

    if (isNaN(idNumber)) {
      throw new BadRequestException('ID должен быть числом');
    }

    const model = await this.modelService.getById({ id: idNumber });
    if (model) return model;
    else throw new PreconditionFailedException();
  }
}
