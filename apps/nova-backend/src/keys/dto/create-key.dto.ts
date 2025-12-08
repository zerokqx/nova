import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateKeyDto {
  @IsInt({ message: 'ID источника должен быть целым числом' })
  @IsNotEmpty({ message: 'ID источника обязателен' })
  @Min(1, { message: 'ID источника должен быть больше 0' })
  @Type(() => Number)
  source_id!: number;

  @IsString()
  @IsNotEmpty({ message: 'API ключ обязателен' })
  @MaxLength(512, { message: 'API ключ слишком длинный (макс. 512 символов)' })
  api_key!: string;

  @IsBoolean({ message: 'is_active должен быть булевым значением' })
  @IsOptional()
  @Type(() => Boolean)
  is_active?: boolean = true;
}
