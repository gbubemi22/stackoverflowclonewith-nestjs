import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.(createUserDto);
  // }
  @Get()
  async findAll(@Res() response) {
    try {
      const users = await this.usersService.findAllUsers();
      return response.status(HttpStatus.OK).json({
        message: `Fatched`,
        users,
      });
    } catch (error) {
      return response.statusCode(error.status).json(error.response);
    }
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // @Post(':email')
  // async findEmail(@Param('email') @Body() email: string) {
  //   const userEmail = await this.usersService.findOneByEmail(email);

  //   if (!userEmail) {
  //     return 'User not found';
  //   }
  //   return userEmail;
  // }

  @Patch('/:id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: `User Updated`,
        user,
      });
    } catch (error) {
      return response.statusCode(error.status).json(error.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const user = await this.usersService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: `User Deleted`,
        user,
      });
    } catch (error) {
      return response.statusCode(error.status).json(error.response);
    }
  }
}
