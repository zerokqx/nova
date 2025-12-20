import { type key } from '@/generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class KeysEntity implements key {
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
