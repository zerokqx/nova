import { Inject, Injectable } from '@nestjs/common';
import { Prisma, type model } from '@ormClient';
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
    return this.prisma.model.count();
  }
  async getAll(): Promise<model[]> {
    return this.prisma.model.findMany();
  }
  async getAllIncludeSources() {
    return await this.prisma.model.findMany({ include: { source: true } });
  }
  async createModel(
    data: Pick<Prisma.modelCreateInput, 'name'> & { sourceId: number }
  ): Promise<Prisma.modelModel {
    return this.prisma.model.create({ data });
  }

  async getForSourceWithNotation(
    where: Pick<Prisma.modelWhereInput, 'sourceId'>
  ): Promise<TNotation[]> {
    const models = await this.prisma.model.findMany({
      where,
      include: { source: { select: { name: true } } },
    });

    return models.map(({ name, source }) =>
      this.notation.createStringNotation(
        source.name,
        this.notation.inferSep(),
        name
      )
    );
  }
  async getForSource(
    where: Pick<Prisma.modelWhereInput, 'sourceId'>
  ): Promise<Prisma.modelModel[] | null> {
    return this.prisma.model.findMany({ where });
  }

  async getById(
    where: Prisma.modelWhereUniqueInput
  ): Promise<Prisma.modelModel | null> {
    return this.prisma.model.findUnique({ where });
  }
}
