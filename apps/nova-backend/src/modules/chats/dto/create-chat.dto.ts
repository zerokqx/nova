import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

const re = /^[^\\/]+\/[^\\/]+$/;
export class CreateChatDto {
  @ApiProperty({
    type: 'string',
    description:
      'Провайдер в формате `name/model`. Например `gemini/gemini-2.5-flash`',
    example: 'perplexity/sonar',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(re)
  provider!: string;

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
