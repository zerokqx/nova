import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@ormClient';
import { TCreateNotation } from '@lib/notation';
import { PrismaService } from '@moduleShared/prisma/prisma.service';
import { modelWhereInput } from '@/generated/prisma/models';
@Injectable()
export class ModelService {
  constructor(
    private prisma: PrismaService,
    @Inject('NOTATION')
    private notation: TCreateNotation
  ) {}
  async getCount() {
    return this.prisma.model.count();
  }
  async getAll() {
    return this.prisma.model.findMany();
  }
  async getAllIncludeSources() {
    return this.prisma.model.findMany({ include: { source: true } });
  }
  async createModel({ name, sourceId }: { name: string; sourceId: number }) {
    return this.prisma.model.create({ data: { name, sourceId } });
  }

  async getForSourceWithNotation(where: Prisma.modelWhereInput) {
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
  async getForSource(where: modelWhereInput) {
    return this.prisma.model.findMany({ where });
  }

  async getById(where: Prisma.modelWhereUniqueInput) {
    return this.prisma.model.findUnique({ where });
  }

  async getOnlyAvailable(include?: Prisma.modelFindManyArgs['include']) {
    return this.prisma.model.findMany({
      where: {
        source: {
          key: {
            is: {
              apiKey: {
                not: '',
              },
            },
          },
        },
      },
      include,
    });
  }
}
