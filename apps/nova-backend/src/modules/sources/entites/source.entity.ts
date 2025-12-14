import { key, model, Prisma, source } from '@/generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SourceEntity implements source {
  @ApiProperty()
  byCreated: string;
  @ApiProperty()
  color: string | null;
  @ApiProperty()
  iconUrl: string | null;

  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

class ModelEntity implements model {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  sourceId: number;
}

class KeyEntity implements key {
  @ApiProperty()
  id: number;
  @ApiProperty()
  sourceId: number;
  @ApiProperty()
  apiKey: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class SourceFullEntity
  extends SourceEntity
  implements Prisma.sourceGetPayload<{ include: { key: true; models: true } }> {
  @ApiProperty({ type: KeyEntity })
  key: KeyEntity | null;
  @ApiProperty({ type: ModelEntity, isArray: true })
  models: ModelEntity[];
}
