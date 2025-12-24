import { Prisma } from '@/generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { SourceEntity } from './source.entity';
import { ModelEntity } from '@modules/model/entities/model.entity';
import { KeysEntity } from '@modules/keys/entities/key.entity';

export class SourceFullEntity
  extends SourceEntity
  implements Prisma.sourceGetPayload<{ include: { key: true; models: true } }> {
  @ApiProperty({ type: KeysEntity })
  key: KeysEntity | null;
  @ApiProperty({ type: ModelEntity, isArray: true })
  models: ModelEntity[];
}
