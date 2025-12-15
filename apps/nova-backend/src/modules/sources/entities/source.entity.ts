import { source } from '@/generated/prisma/client';
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
