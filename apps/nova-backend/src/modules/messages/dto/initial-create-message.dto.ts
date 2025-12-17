import { OmitType } from '@nestjs/swagger';
import { CreateMessageDto } from './create-message.dto';

export class CreateInitialMessageDto extends OmitType(
  CreateMessageDto,
  [] as const
) {}
