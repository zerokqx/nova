import { chat } from '@/generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ChatEntity implements chat {
  @ApiProperty({
    required: true,
    description: 'Провайдер для чата',
    format: 'source/model',
  })
  provider: string;
  @ApiProperty({ format: 'cuid' })
  id: string;
  @ApiProperty()
  title: string;
}
