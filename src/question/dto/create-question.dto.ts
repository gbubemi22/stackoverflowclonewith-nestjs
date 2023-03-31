import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  titile: string;
  @IsNotEmpty()
  Body: string;
  @IsNotEmpty()
  user: string;
}
