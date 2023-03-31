import { IsString } from 'class-validator';
import { Role } from '../user.enum';

export class LoginUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
