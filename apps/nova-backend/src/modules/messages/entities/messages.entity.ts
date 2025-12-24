import { message, Prisma, Roles } from '@/generated/prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartEntity } from './part.entity';

export class MessagesEntity implements message {
  @ApiPropertyOptional()
  metadata: Prisma.JsonValue;
  @ApiProperty({ type: PartEntity, isArray: true, additionalProperties: true })
  parts: Prisma.JsonValue[];
  @ApiProperty({ format: 'cuid' })
  id: string;
  @ApiProperty({ format: 'cuid' })
  chatId: string;

  @ApiProperty({ enum: Roles, default: Roles.user })
  role: Roles;
}
