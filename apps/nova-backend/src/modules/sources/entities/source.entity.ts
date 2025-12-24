import { source } from '@/generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SourceEntity implements source {
  @ApiProperty()
  remarks: string[];
  @ApiProperty()
  bestUseCases: string[];
  @ApiProperty()
  byCreated: string;
  @ApiProperty({ type: 'string', nullable: true })
  color: string | null;
  @ApiProperty({ type: 'string', nullable: true })
  iconUrl: string | null;
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
