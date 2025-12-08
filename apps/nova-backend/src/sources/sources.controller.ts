import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { DataService } from '@/data/data.service';

@Controller('sources')
export class SourcesController {
  constructor(
    private readonly sourcesService: SourcesService,
    private readonly data: DataService
  ) {}

  @Post()
  async create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourcesService.create(createSourceDto);
  }

  @Get()
  async findAll() {
    const data = await this.sourcesService.findAll();
    return this.data.format(data);
  }

  @Get('full')
  async full() {
    const data = await this.sourcesService.full();
    return this.data.format(data);
  }

  @Get('full/:id')
  async fullById(@Param('id') id: string) {
    const data = await this.sourcesService.fullById({ id: +id });
    return this.data.format(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.sourcesService.findOne({ id: +id });
    return this.data.format(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.sourcesService.remove({ where: { id: +id } });
  }
}
