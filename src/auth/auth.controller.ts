import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

//import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAdminDto } from 'src/users/dto/create-admin.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  //@HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.create(createUserDto);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleLogin() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    const googleUserDto: GoogleUserDto = req.user;
    const accessToken = await this.authService.signInGoogle(googleUserDto);
    const tokenUrl = process.env.ORIGIN + '/jwtToken/' + accessToken;
    res.redirect(tokenUrl);
  }

  @Post('siginup/admin')
  createAdmin(
    @Body() createAdminDto: CreateAdminDto,
  ): Promise<{ token: string }> {
    return this.authService.createAdmin(createAdminDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginAuthDto): Promise<{ token: string }> {
    return this.authService.login(user);
  }

  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  verifyJwt(@Body() payload: { jwt: string }) {
    return this.authService.verifyJwt(payload.jwt);
  }
}
