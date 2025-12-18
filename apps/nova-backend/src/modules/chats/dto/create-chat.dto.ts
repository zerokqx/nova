import { chatCreateInput } from '@/generated/prisma/models';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateChatDto implements chatCreateInput {
  @ApiHideProperty()
  id?: string | undefined;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/, {
    message: 'provider must be in format "source/model"',
  })
  provider: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  title: string;
}
