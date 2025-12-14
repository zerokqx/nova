import { model, Prisma, source } from '@/generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';

class SourceEntity implements source {
  @ApiProperty()
  byCreated: string;
  @ApiProperty()
  color: string | null;
  @ApiProperty()
  iconUrl: string | null;
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: number;
}

export class ModelEntity implements model {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  sourceId: number;
}

export class ModelEntityIncludeSource
  extends ModelEntity
  implements
    Prisma.modelGetPayload<{
      include: { source: true };
    }>
{
  @ApiProperty({ type: SourceEntity })
  source: SourceEntity;
}
