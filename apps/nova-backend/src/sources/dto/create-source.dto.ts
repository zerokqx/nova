'use strict';

import { Prisma } from '@/generated/prisma/client';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSourceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name!: Prisma.sourcesCreateInput['name'];
}
