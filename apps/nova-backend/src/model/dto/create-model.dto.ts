import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModelDto {
  @ApiProperty({
    description: 'Название модели',
    example: 'gemini-2.5-flash',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'Слишком большое имя.' })
  name!: string;

  @ApiProperty({
    description: 'ID источника модели',
    example: 1,
    minimum: 1,
  })
  @IsInt({ message: 'ID источника должен быть целым числом' })
  @IsNotEmpty({ message: 'ID источника обязателен' })
  @Min(1, { message: 'ID источника должен быть больше 0' })
  @Type(() => Number)
  source_id!: number;
}
