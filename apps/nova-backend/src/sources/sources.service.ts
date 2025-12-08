import { Injectable } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class SourcesService {
  constructor(private db: PrismaService) { }
  async create(createSourceDto: CreateSourceDto) {
    return await this.db.sources.create({ data: createSourceDto });
  }

  async findAll() {
    return this.db.sources.findMany();
  }

  async full() {
    return await this.db.sources.findMany({
      include: { keys: true, models: true },
    });
  }
  async fullById(data: Prisma.sourcesWhereUniqueInput) {
    return await this.db.sources.findUnique({
      where: data,

      include: { keys: true, models: true },
    });
  }

  async findOne(data: Prisma.sourcesWhereUniqueInput) {
    return await this.db.sources.findUnique({ where: data });
  }

  async remove(data: Prisma.sourcesDeleteArgs) {
    return await this.db.sources.delete(data);
  }
}
