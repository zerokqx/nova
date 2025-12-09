import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SendDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content!: string;

  @IsString()
  @IsNotEmpty()
  apiKey!: string;
}
