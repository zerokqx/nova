import { Prisma } from '@/generated/prisma/client';
import { sourceCreateInput } from '@/generated/prisma/models';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsHexColor,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateSourceDto implements sourceCreateInput {
  @ApiProperty({ format: 'data-time' })
  @MaxLength(100)
  @IsString()
  byCreated: string;

  @ApiPropertyOptional({ type: String, format: 'hex' })
  @IsHexColor()
  color?: string | null | undefined;
  @ApiPropertyOptional({ type: 'string', format: 'url' })
  @IsUrl()
  iconUrl?: string | null | undefined;

  @ApiHideProperty()
  key?: Prisma.keyCreateNestedOneWithoutSourceInput | undefined;
  @ApiHideProperty()
  models?: Prisma.modelCreateNestedManyWithoutSourceInput | undefined;
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name!: Prisma.sourceCreateInput['name'];
}
