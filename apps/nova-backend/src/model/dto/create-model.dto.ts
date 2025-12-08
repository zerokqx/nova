import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'Слишком большое имя.' })
  name!: string;

  @IsInt({ message: 'ID источника должен быть целым числом' })
  @IsNotEmpty({ message: 'ID источника обязателен' })
  @Min(1, { message: 'ID источника должен быть больше 0' })
  @Type(() => Number)
  source_id!: number;
}
