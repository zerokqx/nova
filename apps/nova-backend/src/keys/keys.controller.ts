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
import { DataService } from '@/data/data.service';

@Controller('keys')
export class KeysController {
  constructor(
    private readonly keysService: KeysService,
    private data: DataService
  ) {}

  @Post()
  async create(@Body() createKeyDto: CreateKeyDto) {
    const data = await this.keysService.create(createKeyDto);
    return this.data.format(data);
  }

  @Get()
  async findAll() {
    const data = await this.keysService.findMany();
    return this.data.format(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = this.keysService.findOne({ id: +id });
    return this.data.format(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateKeyDto: UpdateKeyDto) {
    const data = await this.keysService.update({ id: +id, updateKeyDto });
    return this.data.format(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.keysService.remove({ where: { id: +id } });
    return this.data.format(data);
  }
}
