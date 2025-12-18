import { Roles } from '@/generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class PartEntity {
  @ApiProperty()
  type: string;
}
