import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    description: 'Начальное сообщение для чата.',
    type: 'string',
    example: 'Что такое Nixos?',
  })
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  title!: string;
}
