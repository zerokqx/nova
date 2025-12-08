import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindOneDto {
  @IsNumber()
  @Type(() => Number)
  id!: number;
}
