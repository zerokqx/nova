import { Prisma } from '@/generated/prisma/client';
import { MessagesEntity } from '@modules/messages/entities/messages.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ChatEntity } from './chats.entity';

export class ChatIncludeRelationEntity
  extends ChatEntity
  implements Prisma.chatGetPayload<{ include: { messages: true } }>
{
  @ApiProperty({ type: MessagesEntity, isArray: true })
  messages: MessagesEntity[];
}
