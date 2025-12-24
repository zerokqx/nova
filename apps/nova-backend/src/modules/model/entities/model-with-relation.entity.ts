import { Prisma } from '@/generated/prisma/client';
import { ModelEntity } from './model.entity';
import { SourceEntity } from '@modules/sources/entities/source.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ModelEntityIncludeSource
  extends ModelEntity
  implements
  Prisma.modelGetPayload<{
    include: { source: true };
  }> {
  @ApiProperty({ type: SourceEntity })
  source: SourceEntity;
}
