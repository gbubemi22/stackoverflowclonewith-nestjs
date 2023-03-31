import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  body: string;
  @IsOptional()
  id: string;
  @IsNotEmpty()
  @IsString()
  qestion: string;
  @IsNotEmpty()
  @IsString()
  user: string;
}
