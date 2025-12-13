import { Prisma } from '@/generated/prisma/client';
import { Omit } from '@prisma/client/runtime/library';

export type TWithouInitial = Omit<Prisma.messagesCreateInput, 'initial'>;
export type TWithoutChat = Omit<Prisma.messagesCreateInput, 'chat'>;
