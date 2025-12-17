import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Prisma } from '@/generated/prisma/client';
import { PartEntity } from '../entities/part.entity';
import { messageCreateInput } from '@/generated/prisma/models';

export class CreateMessageDto implements messageCreateInput {
  @ApiHideProperty()
  id?: string | undefined;

  @ApiHideProperty()
  chat: Prisma.chatCreateNestedOneWithoutMessagesInput;

  @ApiPropertyOptional({ type: Object })
  @IsObject()
  metadata: Prisma.InputJsonObject;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chatId!: string;

  @ApiProperty({ isArray: true, type: PartEntity, additionalProperties: true })
  @IsNotEmpty()
  @IsArray()
  parts: Prisma.InputJsonArray[];
}
