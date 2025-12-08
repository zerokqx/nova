import { Injectable } from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class KeysService {
  constructor(private keyService: PrismaService) {}

  async create(createKeyDto: CreateKeyDto) {
    return await this.keyService.keys.create({ data: createKeyDto });
  }

  async findMany() {
    return this.keyService.keys.findMany();
  }

  async findOne(data: Prisma.keysWhereUniqueInput) {
    return await this.keyService.keys.findUnique({ where: data });
  }

  async update({
    id,
    updateKeyDto,
  }: {
    id: number;
    updateKeyDto: UpdateKeyDto;
  }) {
    return await this.keyService.keys.update({
      where: { id },
      data: updateKeyDto,
    });
  }

  async remove(data: Prisma.keysDeleteArgs) {
    return this.keyService.keys.delete(data);
  }
}
