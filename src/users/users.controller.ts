import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Request,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Multer } from 'multer';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from './schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':id/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Multer.File,
  ) {
    const imagePath = `./uploads/${file.filename}`;
    const user = await this.usersService.updateUserImage(id, imagePath);
    return user;
  }

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
