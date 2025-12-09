import { Injectable } from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class KeysService {
  constructor(private keyService: PrismaService) {}

  async create(createKeyDto: CreateKeyDto) {
    return await this.keyService.key.create({ data: createKeyDto });
  }

  async findMany() {
    return this.keyService.key.findMany();
  }

  async findOne(data: Prisma.keyWhereUniqueInput) {
    return await this.keyService.key.findUnique({ where: data });
  }

  async update({
    id,
    updateKeyDto,
  }: {
    id: number;
    updateKeyDto: UpdateKeyDto;
  }) {
    return await this.keyService.key.update({
      where: { id },
      data: updateKeyDto,
    });
  }

  async remove(data: Prisma.keyDeleteArgs) {
    return this.keyService.key.delete(data);
  }
}
