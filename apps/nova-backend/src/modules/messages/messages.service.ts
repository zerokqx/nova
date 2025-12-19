import { message, Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@modules/shared/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.messageUncheckedCreateInput) {
    return await this.prisma.message.create({ data });
  }

  async createInitial(data: Prisma.messageUncheckedCreateInput) {
    return await this.prisma.message.create({
      data: {
        ...data,
        metadata: { initial: true },
      },
    });
  }

  async getInitialForChat(chatId: string) {
    return await this.prisma.message.findMany({
      where: { chatId, metadata: { path: ['initial'], equals: true } },
    });
  }

  async getAllMessagesForChat(chatId: string) {
    return await this.prisma.message.findMany({ where: { chatId } });
  }

  async combindedCreate(dataForCreate: Prisma.messageCreateManyInput[]) {
    return await this.prisma.message.createMany({
      data: dataForCreate,
    });
  }
}
