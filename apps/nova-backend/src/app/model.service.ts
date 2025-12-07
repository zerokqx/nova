import { Injectable } from '@nestjs/common';
import { Prisma, type models } from '@ormClient';
import { PrismaService } from './prisma.service';
import { notation } from '../lib/notation';
@Injectable()
export class ModelService {
  constructor(private prisma: PrismaService) { }
  async getAll(): Promise<models[]> {
    return this.prisma.models.findMany();
  }
  async createModel(
    data: Prisma.modelsCreateInput
  ): Promise<Prisma.modelsModel> {
    return this.prisma.models.create({ data });
  }

  async getForSourceWithNotation(
    where: Pick<Prisma.modelsWhereInput, 'source_id'>
  ) {
    const models = await this.prisma.models.findMany({
      where,
      include: { sources: true },
    });

    return models.map(({ name, sources }) =>
      notation.createStringNotation(sources.name, '/', name)
    );
  }
  async getForSource(
    where: Pick<Prisma.modelsWhereInput, 'source_id'>
  ): Promise<Prisma.modelsModel[] | null> {
    return this.prisma.models.findMany({ where });
  }

  async getById(
    where: Prisma.modelsWhereUniqueInput
  ): Promise<Prisma.modelsModel | null> {
    return this.prisma.models.findUnique({ where });
  }
}
