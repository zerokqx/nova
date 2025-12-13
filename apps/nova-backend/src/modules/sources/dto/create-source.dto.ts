import { Prisma } from '@/generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSourceDto {
  @ApiProperty({
    description: 'Имя источника',
    type: 'string',
    example: 'Gemini',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name!: Prisma.sourceCreateInput['name'];
}
