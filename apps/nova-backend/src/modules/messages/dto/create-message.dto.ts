import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { JsonObject, JsonValue } from '@prisma/client/runtime/library';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Prisma } from '@/generated/prisma/client';
import { PartEntity } from '../entities/part.entity';

export class CreateMessageDto {
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
