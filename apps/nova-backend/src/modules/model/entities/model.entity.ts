import { model, Prisma, source } from '@/generated/prisma/client';
import { SourceEntity } from '@modules/sources/entities/source.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ModelEntity implements model {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  sourceId: number;
}

