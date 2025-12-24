import { Injectable } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import { PrismaService } from '@moduleShared/prisma/prisma.service';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class SourcesService {
  constructor(private db: PrismaService) {}
  async create(createSourceDto: CreateSourceDto) {
    return await this.db.source.create({ data: createSourceDto });
  }

  async findAll() {
    return this.db.source.findMany();
  }

  async full() {
    return await this.db.source.findMany({
      include: { key: true, models: true },
    });
  }
  async fullById(data: Prisma.sourceWhereUniqueInput) {
    return await this.db.source.findUnique({
      where: data,

      include: { key: true, models: true },
    });
  }

  async findOne(
    data: Prisma.sourceWhereUniqueInput,
    select?: Prisma.sourceSelect
  ) {
    return await this.db.source.findUnique({ where: data, select });
  }

  async remove(data: Prisma.sourceDeleteArgs) {
    return await this.db.source.delete(data);
  }

  async getApiViaNameSource(name: string) {
    return await this.db.source.findUnique({
      where: { name },
      select: { key: { select: { apiKey: true } } },
    });
  }
}
