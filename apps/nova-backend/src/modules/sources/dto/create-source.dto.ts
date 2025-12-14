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
  @ApiProperty()
  @MaxLength(100)
  @IsString()
  byCreated: string;

  @ApiPropertyOptional()
  @IsHexColor()
  color?: string | null | undefined;
  @ApiPropertyOptional()
  @IsUrl()
  iconUrl?: string | null | undefined;

  @ApiHideProperty()
  key?: Prisma.keyCreateNestedOneWithoutSourceInput | undefined;
  @ApiHideProperty()
  models?: Prisma.modelCreateNestedManyWithoutSourceInput | undefined;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name!: Prisma.sourceCreateInput['name'];
}
