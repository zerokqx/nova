import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsString,
} from 'class-validator';
import { UIMessage } from 'ai';

export class SendDto {
  @ApiProperty({
    description: 'Запрос к модели',
    maxLength: 1000,
    example: 'Что такое Linux',
    type: 'string',
    required: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  messages!: UIMessage[];
  @IsString()
  id!: string;

  @IsString()
  trigger!: string;
}
