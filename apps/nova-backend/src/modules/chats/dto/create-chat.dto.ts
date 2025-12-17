import { chatCreateInput } from '@/generated/prisma/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto implements chatCreateInput {
  @ApiProperty({
    description: 'Начальное сообщение для чата.',
    type: 'string',
  })
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  title: string;
}
