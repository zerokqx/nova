import { chat, Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@modules/shared/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Omit } from '@prisma/client/runtime/library';
import { title } from 'process';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}
  async create(data: Omit<chat, 'id'>) {
    return await this.prisma.chat.create({ data });
  }

  async update(data: Partial<Omit<chat, 'id'>>, id: chat['id']) {
    return await this.prisma.chat.update({ data, where: { id } });
  }

  async delete(id: chat['id']) {
    return await this.prisma.chat.delete({ where: { id } });
  }

  async findMany() {
    return await this.prisma.chat.findMany({ orderBy: { id: 'asc' } });
  }
  async findByKeyWord(data: Prisma.chatWhereInput) {
    return await this.prisma.chat.findMany({ where: data });
  }
  async findByid(id: chat['id']) {
    return await this.prisma.chat.findUnique({ where: { id } });
  }
  async selectChat(id: chat['id']) {
    return await this.prisma.chat.findUnique({
      where: { id },
      include: { messages: true },
    });
  }
}
