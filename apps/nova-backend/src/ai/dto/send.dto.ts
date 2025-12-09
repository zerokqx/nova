import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { tr } from 'zod/v4/locales';

export class SendDto {
  @ApiProperty({
    description: 'Запрос к модели',
    maxLength: 1000,
    example: 'Что такое Linux',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content!: string;

  @ApiProperty({
    description: 'Ключ Api для авторизации',
    required: true,
    type: 'string',
    example: 'pplx-*******************',
  })
  @IsString()
  @IsNotEmpty()
  apiKey!: string;
}
