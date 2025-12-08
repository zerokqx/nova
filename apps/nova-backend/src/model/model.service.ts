import { Inject, Injectable } from '@nestjs/common';
import { Prisma, type models } from '@ormClient';
import { TCreateNotation, TNotation } from '@lib/notation';
import { PrismaService } from '@/prisma/prisma.service';
@Injectable()
export class ModelService {
  constructor(
    private prisma: PrismaService,
    @Inject('NOTATION')
    private notation: TCreateNotation
  ) {}
  async getCount(): Promise<number> {
    return this.prisma.models.count();
  }
  async getAll(): Promise<models[]> {
    return this.prisma.models.findMany();
  }
  async getAllIncludeSources() {
    return await this.prisma.models.findMany({ include: { sources: true } });
  }
  async createModel(
    data: Pick<Prisma.modelsCreateInput, 'name'> & { source_id: number }
  ): Promise<Prisma.modelsModel> {
    return this.prisma.models.create({ data });
  }

  async getForSourceWithNotation(
    where: Pick<Prisma.modelsWhereInput, 'source_id'>
  ): Promise<TNotation[]> {
    const models = await this.prisma.models.findMany({
      where,
      include: { sources: { select: { name: true } } },
    });

    return models.map(({ name, sources }) =>
      this.notation.createStringNotation(
        sources.name,
        this.notation.inferSep(),
        name
      )
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
