import { model } from '@/generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ModelEntity implements model {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  sourceId: number;
}
