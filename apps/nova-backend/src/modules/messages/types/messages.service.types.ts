import { Prisma } from '@/generated/prisma/client';
import { Omit } from '@prisma/client/runtime/library';

export type TWithouInitial = Omit<Prisma.messageCreateInput, 'initial'>;
export type TWithoutChat = Omit<Prisma.messageCreateInput, 'chat'>;
