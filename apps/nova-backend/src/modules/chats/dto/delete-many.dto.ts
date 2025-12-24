import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteManyChatDto {
  @ApiProperty({
    isArray: true,
    type: 'string',
  })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
