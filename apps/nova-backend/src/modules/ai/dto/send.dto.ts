import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UIMessage } from 'ai';

export class SendDto {
  @ApiProperty({
    description: 'Масив сообщений',
    maxLength: 1000,
    example: 'Что такое Linux',
    type: 'array',
    required: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  messages!: UIMessage[];
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  messageId: string;
  @IsString()
  trigger!: string;
}
