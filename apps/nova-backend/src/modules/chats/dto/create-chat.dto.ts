import { chatCreateInput } from '@/generated/prisma/models';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateChatDto implements chatCreateInput {
  @ApiHideProperty()
  id?: string | undefined;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  provider: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  title: string;
}
