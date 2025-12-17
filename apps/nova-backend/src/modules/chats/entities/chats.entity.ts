import { chat } from '@/generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ChatEntity implements chat {
  @ApiProperty({ format: 'cuid' })
  id: string;
  @ApiProperty()
  title: string;
}
