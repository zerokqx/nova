import { messages, Prisma, Roles } from '@/generated/prisma/client';
import { PrismaService } from '@modules/shared/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TWithouInitial, TWithoutChat } from './types/messages.service.types';
import { Omit, Pick } from '@prisma/client/runtime/library';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) { }
  private async createContection(data: TWithoutChat, chatId: number) {
    return await this.prisma.messages.create({ data: { ...data, chatId } });
  }

  async create(
    data: TWithouInitial | TWithoutChat,
    chatId: number
  ): Promise<messages> {
    return await this.createContection(data, chatId);
  }

  async createInitial(
    data: Omit<TWithoutChat | TWithouInitial, 'role'>,
    chatId: number
  ) {
    return await this.createContection(
      { ...data, role: 'user', initial: true },
      chatId
    );
  }

  async getInitialForChat(chatId: number) {
    return await this.prisma.messages.findMany({
      where: { chatId, initial: true },
    });
  }

  async getAllMessagesForChat(chatId: number) {
    return this.prisma.messages.findMany({ where: { chatId } });
  }
}
