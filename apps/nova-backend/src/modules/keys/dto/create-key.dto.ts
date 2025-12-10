import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Для какого источника создавать ApiKey',
    required: true,
    type: 'number',
    minimum: 1,
    example: 1,
  })
  @IsInt({ message: 'ID источника должен быть целым числом' })
  @IsNotEmpty({ message: 'ID источника обязателен' })
  @Min(1, { message: 'ID источника должен быть больше 0' })
  @Type(() => Number)
  sourceId!: number;

  @ApiProperty({
    description: 'Api ключ',
    required: true,
    type: 'string',
    example: 'pplx-**********',
  })
  @IsString()
  @IsNotEmpty({ message: 'API ключ обязателен' })
  @MaxLength(512, { message: 'API ключ слишком длинный (макс. 512 символов)' })
  apiKey!: string;

  @ApiPropertyOptional({
    description: 'Являеться на данный момент ключ активным.',
    type: 'boolean',
    example: true,
  })
  @IsBoolean({ message: 'is_active должен быть булевым значением' })
  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean = true;
}
