import { Roles } from '@/generated/prisma/enums';
import { AiProvider } from '@modules/ai/ai.abstract';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Record } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Айди чата для которого сообщение',
    required: true,
    example: 1,
    type: 'number',
    minimum: 1,
  })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  chatId!: number;

  @ApiProperty({
    description: 'Текст сообщения',
    type: 'string',
    example: 'Что такое Nixos?',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content!: string;

  @ApiPropertyOptional({
    description: 'Роль для текущего сообщения',
    example: Roles.user,
    enum: Roles,
  })
  @IsEnum(Roles)
  @IsOptional()
  role: Roles = 'user';
}
