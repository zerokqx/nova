import { message, Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@modules/shared/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}
  private async createContection(data: Prisma.messageCreateInput) {
    return await this.prisma.message.create({ data });
  }

  async create(data: Prisma.messageCreateInput): Promise<message> {
    return await this.createContection(data);
  }

  async createInitial(data: Prisma.messageCreateInput) {
    return await this.createContection({
      ...data,
      metadata: { initial: true },
    });
  }

  async getInitialForChat(chatId: string) {
    return await this.prisma.message.findMany({
      where: { chatId, metadata: { path: ['initial'], equals: true } },
    });
  }

  async getAllMessagesForChat(chatId: string) {
    return this.prisma.message.findMany({ where: { chatId } });
  }
}
